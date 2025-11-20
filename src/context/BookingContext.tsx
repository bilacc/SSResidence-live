import React, { createContext, useContext, useState } from 'react';

interface BookingContextType {
    isBookingOpen: boolean;
    openBooking: (apartmentId?: string) => void;
    closeBooking: () => void;
    selectedApartmentId: string | null;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [selectedApartmentId, setSelectedApartmentId] = useState<string | null>(null);

    const openBooking = (apartmentId?: string) => {
        if (apartmentId) setSelectedApartmentId(apartmentId);
        setIsBookingOpen(true);
    };

    const closeBooking = () => {
        setIsBookingOpen(false);
        setSelectedApartmentId(null);
    };

    return (
        <BookingContext.Provider value={{ isBookingOpen, openBooking, closeBooking, selectedApartmentId }}>
            {children}
        </BookingContext.Provider>
    );
};

export const useBooking = () => {
    const context = useContext(BookingContext);
    if (context === undefined) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
};
