import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Car, Dumbbell, Trees, Shield, Wifi, Coffee, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

const features = [
    { icon: Car, title: 'Private Parking', desc: 'Secure underground parking with dedicated spots for every resident.', colSpan: 'md:col-span-2' },
    { icon: Dumbbell, title: 'Fitness Center', desc: 'State-of-the-art gym equipment open 24/7 for your wellness journey.', colSpan: 'md:col-span-1' },
    { icon: Trees, title: 'Green Spaces', desc: 'Beautifully landscaped gardens and walking paths for relaxation.', colSpan: 'md:col-span-1' },
    { icon: Shield, title: '24/7 Security', desc: 'Round-the-clock surveillance and concierge service for your peace of mind.', colSpan: 'md:col-span-2' },
    { icon: Wifi, title: 'Smart Home', desc: 'Integrated smart home features including climate and lighting control.', colSpan: 'md:col-span-1' },
    { icon: Coffee, title: 'Residents Lounge', desc: 'Exclusive lounge area for social gatherings and private events.', colSpan: 'md:col-span-2' },
];

export const Features: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section id="features" className="py-24 bg-white dark:bg-[#020817] transition-colors">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-2 block">Lifestyle</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary dark:text-white mb-6">
                        {t('features.title')}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
                        Experience a life of uncompromising luxury with our world-class amenities designed for your comfort and convenience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={clsx(
                                "group relative overflow-hidden rounded-3xl p-8 bg-accent dark:bg-card border border-transparent dark:border-white/10 hover:shadow-2xl transition-all duration-500",
                                feature.colSpan
                            )}
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                                <feature.icon className="w-32 h-32 text-primary dark:text-white" />
                            </div>

                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div>
                                    <div className="w-12 h-12 bg-white dark:bg-primary rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                        <feature.icon className="w-6 h-6 text-secondary dark:text-primary-foreground" />
                                    </div>
                                    <h3 className="text-2xl font-serif font-bold text-primary dark:text-white mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </div>

                                <div className="mt-8 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                    <a href="#contact" className="inline-flex items-center text-secondary font-bold hover:text-secondary-dark">
                                        Learn more <ArrowRight className="ml-2 w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
