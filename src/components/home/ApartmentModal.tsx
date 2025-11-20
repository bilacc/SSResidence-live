import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize, Home, CheckCircle } from 'lucide-react';
import type { Apartment } from '../../data/apartments';
import { useTranslation } from 'react-i18next';
import { useBooking } from '../../context/BookingContext';

interface ApartmentModalProps {
    apartment: Apartment | null;
    onClose: () => void;
}

export const ApartmentModal: React.FC<ApartmentModalProps> = ({ apartment, onClose }) => {
    const { t } = useTranslation();
    const { openBooking } = useBooking();

    if (!apartment) return null;

    return (
        <AnimatePresence>
            {apartment && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/90 z-50 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-card w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl pointer-events-auto border border-border ring-1 ring-white/10">
                            <div className="relative">
                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-6 right-6 p-3 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors z-10 backdrop-blur-md"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                {/* Content Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    {/* Image / Gallery Section */}
                                    <div className="h-80 md:h-auto bg-muted relative group overflow-hidden">
                                        <img
                                            src={`https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                                            alt={`Apartment ${apartment.unitNumber}`}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute bottom-6 left-6 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-bold tracking-wider backdrop-blur-md border border-white/10">
                                            {apartment.status.toUpperCase()}
                                        </div>
                                    </div>

                                    {/* Details Section */}
                                    <div className="p-10 space-y-8">
                                        <div>
                                            <h2 className="text-4xl font-display font-bold text-foreground mb-4">
                                                Unit {apartment.unitNumber}
                                            </h2>
                                            <p className="text-muted-foreground text-lg leading-relaxed">
                                                {apartment.description}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="p-6 bg-muted/50 rounded-2xl border border-border">
                                                <div className="flex items-center space-x-2 text-primary mb-2">
                                                    <Maximize className="w-5 h-5" />
                                                    <span className="text-sm font-bold uppercase tracking-wider">Size</span>
                                                </div>
                                                <p className="text-3xl font-display font-bold text-foreground">{apartment.size} <span className="text-lg text-muted-foreground">m²</span></p>
                                            </div>
                                            <div className="p-6 bg-muted/50 rounded-2xl border border-border">
                                                <div className="flex items-center space-x-2 text-primary mb-2">
                                                    <Home className="w-5 h-5" />
                                                    <span className="text-sm font-bold uppercase tracking-wider">Bedrooms</span>
                                                </div>
                                                <p className="text-3xl font-display font-bold text-foreground">{apartment.bedrooms}</p>
                                            </div>
                                        </div>

                                        <div className="border-t border-border pt-8">
                                            <div className="flex justify-between items-end mb-8">
                                                <div>
                                                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Price</p>
                                                    <p className="text-4xl font-display font-bold text-foreground">
                                                        €{apartment.price.toLocaleString()}
                                                    </p>
                                                </div>
                                                {apartment.status === 'available' && (
                                                    <div className="flex items-center text-emerald-500 text-sm font-bold bg-emerald-500/10 px-3 py-1.5 rounded-full">
                                                        <CheckCircle className="w-4 h-4 mr-2" />
                                                        Available Now
                                                    </div>
                                                )}
                                            </div>

                                            <button
                                                onClick={() => {
                                                    openBooking(String(apartment.id));
                                                    onClose();
                                                }}
                                                className="w-full py-5 bg-primary text-primary-foreground font-bold text-lg rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
                                            >
                                                {t('booking.book_viewing', 'Book a Viewing')}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
