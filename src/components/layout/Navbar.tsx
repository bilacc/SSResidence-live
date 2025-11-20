import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '../ui/ThemeToggle';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { useBooking } from '../../context/BookingContext';
import clsx from 'clsx';

export const Navbar: React.FC = () => {
    const { t } = useTranslation();
    const { openBooking } = useBooking();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: t('nav.home'), href: '#' },
        { name: t('nav.apartments'), href: '#apartments' },
        { name: t('nav.features'), href: '#features' },
        { name: t('nav.contact'), href: '#contact' },
    ];

    return (
        <nav className={clsx(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center pt-6 px-4",
            isScrolled ? "py-4" : "py-6"
        )}>
            <div className={clsx(
                "w-full max-w-6xl rounded-full transition-all duration-500 flex items-center justify-between px-8 py-4 backdrop-blur-xl border border-white/10 shadow-2xl",
                isScrolled
                    ? "bg-background/80 shadow-xl scale-100"
                    : "bg-background/60 scale-105"
            )}>
                {/* Logo */}
                <a href="#" className="text-3xl font-display font-bold text-foreground tracking-tighter hover:opacity-80 transition-opacity">
                    LUX<span className="text-secondary">ESTATE</span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-10">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Actions */}
                <div className="hidden md:flex items-center space-x-6">
                    <LanguageSwitcher />
                    <ThemeToggle />

                    <button
                        onClick={() => openBooking()}
                        className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-bold hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 flex items-center cursor-pointer shadow-lg shadow-primary/20"
                    >
                        <Phone className="w-4 h-4 mr-2" />
                        {t('nav.book')}
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-foreground hover:bg-muted rounded-full transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="absolute top-28 left-4 right-4 bg-card/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:hidden border border-border ring-1 ring-black/5"
                    >
                        <div className="flex flex-col space-y-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-2xl font-display font-bold text-foreground hover:text-secondary transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <hr className="border-border" />
                            <div className="flex justify-between items-center pt-4">
                                <LanguageSwitcher />
                                <ThemeToggle />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
