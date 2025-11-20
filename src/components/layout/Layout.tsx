import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { BookingProvider, useBooking } from '../../context/BookingContext';
import { BookingModal } from '../booking/BookingModal';

interface LayoutProps {
    children: React.ReactNode;
}

const LayoutContent: React.FC<LayoutProps> = ({ children }) => {
    const { isBookingOpen, closeBooking, selectedApartmentId } = useBooking();

    return (
        <div className="min-h-screen flex flex-col bg-cream dark:bg-primary-dark transition-colors duration-300">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
            <BookingModal
                isOpen={isBookingOpen}
                onClose={closeBooking}
                apartmentId={selectedApartmentId}
            />
        </div>
    );
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <BookingProvider>
            <LayoutContent>{children}</LayoutContent>
        </BookingProvider>
    );
};
