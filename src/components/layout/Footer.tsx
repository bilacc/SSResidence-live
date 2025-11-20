import React from 'react';
import { useTranslation } from 'react-i18next';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-primary text-cream pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-serif font-bold">
                            LUX<span className="text-accent">ESTATE</span>
                        </h3>
                        <p className="text-cream/60 leading-relaxed">
                            {t('hero.subtitle')}
                        </p>
                    </div>

                    {/* Contact */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-medium text-accent">{t('nav.contact')}</h4>
                        <ul className="space-y-4 text-cream/60">
                            <li className="flex items-center space-x-3">
                                <MapPin className="w-5 h-5 text-accent" />
                                <span>123 Luxury Ave, City Center</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-accent" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-accent" />
                                <span>info@luxestate.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Links */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-medium text-accent">{t('nav.home')}</h4>
                        <ul className="space-y-4 text-cream/60">
                            <li><a href="#apartments" className="hover:text-white transition-colors">{t('nav.apartments')}</a></li>
                            <li><a href="#features" className="hover:text-white transition-colors">{t('nav.features')}</a></li>
                            <li><a href="#contact" className="hover:text-white transition-colors">{t('nav.contact')}</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-medium text-accent">Newsletter</h4>
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent text-white placeholder-white/40 transition-colors"
                            />
                            <button className="w-full px-6 py-3 bg-accent text-primary font-medium rounded-lg hover:bg-accent-light transition-colors">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-cream/40 text-sm">
                        © 2024 LuxEstate. {t('footer.rights')}
                    </p>
                    <div className="flex space-x-6">
                        <a href="#" className="text-cream/40 hover:text-accent transition-colors"><Facebook className="w-5 h-5" /></a>
                        <a href="#" className="text-cream/40 hover:text-accent transition-colors"><Instagram className="w-5 h-5" /></a>
                        <a href="#" className="text-cream/40 hover:text-accent transition-colors"><Linkedin className="w-5 h-5" /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
