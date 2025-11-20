import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
    const { t } = useTranslation();
    const heroRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(textRef.current, {
                y: 50,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.out',
                delay: 0.2
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80"
                    alt="Luxury Building"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
            </div>

            {/* Content */}
            <div ref={textRef} className="relative z-10 text-center px-4 max-w-6xl mx-auto mt-20">
                <span className="inline-block py-1.5 px-4 border border-white/20 bg-white/5 rounded-full text-white/90 text-sm font-medium tracking-[0.2em] uppercase mb-8 backdrop-blur-md">
                    Exclusive Waterfront Living
                </span>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-white mb-8 leading-none tracking-tighter drop-shadow-2xl">
                    {t('hero.title')}
                </h1>
                <p className="text-xl md:text-2xl text-white/80 mb-12 font-light max-w-3xl mx-auto leading-relaxed tracking-wide">
                    {t('hero.subtitle')}
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <a
                        href="#apartments"
                        className="group inline-flex items-center bg-white text-black px-10 py-5 rounded-full text-lg font-bold tracking-wide hover:bg-secondary hover:text-white transition-all duration-500 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_-10px_rgba(197,160,89,0.5)] transform hover:-translate-y-1"
                    >
                        {t('hero.cta')}
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a
                        href="#contact"
                        className="inline-flex items-center bg-white/5 border border-white/20 text-white px-10 py-5 rounded-full text-lg font-bold tracking-wide hover:bg-white/10 hover:border-white/40 transition-all duration-300 backdrop-blur-md"
                    >
                        Book a Viewing
                    </a>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                    <div className="w-1 h-2 bg-white/50 rounded-full" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
