import React from 'react';
import Hero from '../components/home/Hero';
import InteractiveMap from '../components/home/InteractiveMap';
import { Features } from '../components/home/Features';
import { ContactForm } from '../components/contact/ContactForm';

export const Home: React.FC = () => {
    return (
        <>
            <Hero />
            <InteractiveMap />
            <Features />
            <ContactForm />
        </>
    );
};
