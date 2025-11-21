import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const schema = z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(6, 'Phone number is required'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

export const ContactForm: React.FC = () => {
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(data);
        reset();
        alert('Message sent successfully!');
    };

    return (
        <section id="contact" className="py-20 bg-cream dark:bg-[#020817]">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto bg-white dark:bg-card border border-transparent dark:border-white/10 p-8 md:p-12 rounded-2xl shadow-xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary dark:text-white mb-4">
                            {t('contact.title')}
                        </h2>
                        <p className="text-primary/60 dark:text-muted-foreground">
                            Interested in a viewing? Fill out the form below and our team will contact you shortly.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-primary dark:text-gray-200 mb-2">Name</label>
                                <input
                                    {...register('name')}
                                    className="w-full px-4 py-3 bg-cream dark:bg-input border border-primary/10 dark:border-white/10 rounded-lg focus:outline-none focus:border-primary transition-colors text-primary dark:text-white"
                                    placeholder="John Doe"
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-primary dark:text-gray-200 mb-2">Email</label>
                                <input
                                    {...register('email')}
                                    className="w-full px-4 py-3 bg-cream dark:bg-input border border-primary/10 dark:border-white/10 rounded-lg focus:outline-none focus:border-primary transition-colors text-primary dark:text-white"
                                    placeholder="john@example.com"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-primary dark:text-gray-200 mb-2">Phone</label>
                            <input
                                {...register('phone')}
                                className="w-full px-4 py-3 bg-cream dark:bg-input border border-primary/10 dark:border-white/10 rounded-lg focus:outline-none focus:border-primary transition-colors text-primary dark:text-white"
                                placeholder="+1 (555) 000-0000"
                            />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-primary dark:text-gray-200 mb-2">Message</label>
                            <textarea
                                {...register('message')}
                                rows={4}
                                className="w-full px-4 py-3 bg-cream dark:bg-input border border-primary/10 dark:border-white/10 rounded-lg focus:outline-none focus:border-primary transition-colors text-primary dark:text-white"
                                placeholder="I'm interested in the penthouse..."
                            />
                            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isSubmitting}
                            className="w-full py-4 bg-accent dark:bg-primary text-primary dark:text-primary-foreground font-bold text-lg rounded-lg hover:bg-accent-light dark:hover:bg-primary/90 transition-colors shadow-lg hover:shadow-accent/20 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </motion.button>
                    </form>
                </div>
            </div>
        </section>
    );
};
