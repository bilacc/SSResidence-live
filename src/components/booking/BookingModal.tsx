import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    apartmentId?: string | null;
}

const bookingSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(6, 'Valid phone number is required'),
    date: z.string().min(1, 'Date is required'),
    time: z.string().min(1, 'Time is required'),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, apartmentId }) => {
    const { t } = useTranslation();
    const [step, setStep] = useState<'date' | 'details' | 'confirmation'>('date');
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');

    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<BookingFormValues>({
        resolver: zodResolver(bookingSchema),
    });

    // Mock dates (next 7 days)
    const dates = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i + 1);
        return {
            value: d.toISOString().split('T')[0],
            label: d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' }),
        };
    });

    const timeSlots = [
        '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'
    ];

    const onSubmit = (data: BookingFormValues) => {
        console.log('Booking Data:', { ...data, apartmentId });
        // Simulate API call
        setTimeout(() => {
            setStep('confirmation');
        }, 1000);
    };

    const handleDateSelect = (date: string) => {
        setSelectedDate(date);
        setValue('date', date);
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        setValue('time', time);
    };

    const handleNext = () => {
        if (step === 'date' && selectedDate && selectedTime) {
            setStep('details');
        }
    };

    const handleClose = () => {
        setStep('date');
        reset();
        setSelectedDate('');
        setSelectedTime('');
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 m-auto w-full max-w-lg h-fit max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl z-[70] overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 sticky top-0 z-10">
                            <div>
                                <h2 className="text-2xl font-playfair text-slate-900 dark:text-white">
                                    {step === 'confirmation' ? t('booking.confirmed') : t('booking.title', 'Book a Viewing')}
                                </h2>
                                {apartmentId && step !== 'confirmation' && (
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        {t('booking.for_unit', 'For Unit')} {apartmentId}
                                    </p>
                                )}
                            </div>
                            <button
                                onClick={handleClose}
                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-slate-500" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto custom-scrollbar">
                            {step === 'date' && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-secondary" />
                                            {t('booking.select_date', 'Select Date')}
                                        </h3>
                                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                            {dates.map((date) => (
                                                <button
                                                    key={date.value}
                                                    onClick={() => handleDateSelect(date.value)}
                                                    className={`p-3 rounded-xl text-sm border transition-all ${selectedDate === date.value
                                                            ? 'border-secondary bg-secondary/10 text-secondary font-medium'
                                                            : 'border-slate-200 dark:border-slate-700 hover:border-secondary/50 text-slate-600 dark:text-slate-300'
                                                        }`}
                                                >
                                                    {date.label}
                                                </button>
                                            ))}
                                        </div>
                                        {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-secondary" />
                                            {t('booking.select_time', 'Select Time')}
                                        </h3>
                                        <div className="grid grid-cols-4 gap-2">
                                            {timeSlots.map((time) => (
                                                <button
                                                    key={time}
                                                    onClick={() => handleTimeSelect(time)}
                                                    disabled={!selectedDate}
                                                    className={`p-3 rounded-xl text-sm border transition-all ${selectedTime === time
                                                            ? 'border-secondary bg-secondary/10 text-secondary font-medium'
                                                            : 'border-slate-200 dark:border-slate-700 hover:border-secondary/50 text-slate-600 dark:text-slate-300'
                                                        } ${!selectedDate ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                        {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>}
                                    </div>

                                    <button
                                        onClick={handleNext}
                                        disabled={!selectedDate || !selectedTime}
                                        className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {t('common.next', 'Next Step')}
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            )}

                            {step === 'details' && (
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                                {t('contact.name', 'Full Name')}
                                            </label>
                                            <input
                                                {...register('name')}
                                                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-secondary/50 outline-none transition-all"
                                                placeholder="John Doe"
                                            />
                                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                                {t('contact.email', 'Email Address')}
                                            </label>
                                            <input
                                                {...register('email')}
                                                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-secondary/50 outline-none transition-all"
                                                placeholder="john@example.com"
                                            />
                                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                                {t('contact.phone', 'Phone Number')}
                                            </label>
                                            <input
                                                {...register('phone')}
                                                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-secondary/50 outline-none transition-all"
                                                placeholder="+1 234 567 890"
                                            />
                                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                                        </div>
                                    </div>

                                    <div className="flex gap-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setStep('date')}
                                            className="px-6 py-4 border border-slate-200 dark:border-slate-700 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 py-4 bg-secondary text-white rounded-xl font-medium hover:bg-secondary-dark transition-colors shadow-lg shadow-secondary/20"
                                        >
                                            {t('booking.confirm', 'Confirm Booking')}
                                        </button>
                                    </div>
                                </form>
                            )}

                            {step === 'confirmation' && (
                                <div className="text-center py-8">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
                                    >
                                        <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                                    </motion.div>
                                    <h3 className="text-xl font-playfair text-slate-900 dark:text-white mb-2">
                                        {t('booking.success_title', 'Booking Confirmed!')}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 mb-8">
                                        {t('booking.success_message', 'We have sent a confirmation email to your inbox. We look forward to seeing you.')}
                                    </p>
                                    <button
                                        onClick={handleClose}
                                        className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-medium hover:opacity-90 transition-opacity"
                                    >
                                        {t('common.close', 'Close')}
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
