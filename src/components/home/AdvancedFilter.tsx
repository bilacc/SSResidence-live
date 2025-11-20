import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Filter, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { useFilter, type IFilterState } from '../../context/FilterContext';

interface AdvancedFilterProps {
    onFilterChange: (filters: IFilterState) => void;
    initialMinPrice: number;
    initialMaxPrice: number;
    initialMinSize: number;
    initialMaxSize: number;
}

export const AdvancedFilter: React.FC<AdvancedFilterProps> = ({
    onFilterChange,
    initialMinPrice,
    initialMaxPrice,
    initialMinSize,
    initialMaxSize,
}) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const { filters, setFilters, resetFilters } = useFilter();

    useEffect(() => {
        onFilterChange(filters);
    }, [filters, onFilterChange]);

    const toggleBedroom = (num: number) => {
        setFilters(prev => ({
            ...prev,
            bedrooms: prev.bedrooms.includes(num)
                ? prev.bedrooms.filter(n => n !== num)
                : [...prev.bedrooms, num]
        }));
    };

    const toggleStatus = (status: string) => {
        setFilters(prev => ({
            ...prev,
            status: prev.status.includes(status)
                ? prev.status.filter(s => s !== status)
                : [...prev.status, status]
        }));
    };

    return (
        <div className="relative z-40 mb-8">
            {/* Mobile Toggle / Desktop Header */}
            <div className="flex justify-between items-center md:justify-center">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 px-8 py-4 bg-card/80 backdrop-blur-md rounded-full shadow-lg border border-border text-foreground font-bold hover:bg-accent transition-all hover:scale-105 active:scale-95"
                >
                    <Filter className="w-4 h-4" />
                    {t('filter.title', 'Filter Apartments')}
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -20, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="mt-6 p-8 bg-card/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-border max-w-5xl mx-auto ring-1 ring-black/5">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                                {/* Price Range */}
                                <div className="space-y-4">
                                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                        {t('filter.price_range', 'Price Range')}
                                    </label>
                                    <div className="flex items-center gap-3 text-sm font-bold text-foreground">
                                        <span className="min-w-[3ch]">€{(filters.priceRange[0] / 1000).toFixed(0)}k</span>
                                        <input
                                            type="range"
                                            min={initialMinPrice}
                                            max={initialMaxPrice}
                                            step={10000}
                                            value={filters.priceRange[1]}
                                            onChange={(e) => setFilters(prev => ({ ...prev, priceRange: [prev.priceRange[0], Number(e.target.value)] }))}
                                            className="flex-1 h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary hover:accent-secondary transition-colors"
                                        />
                                        <span className="min-w-[3ch]">€{(filters.priceRange[1] / 1000).toFixed(0)}k</span>
                                    </div>
                                </div>

                                {/* Size Range */}
                                <div className="space-y-4">
                                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                        {t('filter.size_range', 'Size Range')}
                                    </label>
                                    <div className="flex items-center gap-3 text-sm font-bold text-foreground">
                                        <span className="min-w-[3ch]">{filters.sizeRange[0]}m²</span>
                                        <input
                                            type="range"
                                            min={initialMinSize}
                                            max={initialMaxSize}
                                            value={filters.sizeRange[1]}
                                            onChange={(e) => setFilters(prev => ({ ...prev, sizeRange: [prev.sizeRange[0], Number(e.target.value)] }))}
                                            className="flex-1 h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary hover:accent-secondary transition-colors"
                                        />
                                        <span className="min-w-[3ch]">{filters.sizeRange[1]}m²</span>
                                    </div>
                                </div>

                                {/* Bedrooms */}
                                <div className="space-y-4">
                                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                        {t('filter.bedrooms', 'Bedrooms')}
                                    </label>
                                    <div className="flex gap-3">
                                        {[1, 2, 3].map(num => (
                                            <button
                                                key={num}
                                                onClick={() => toggleBedroom(num)}
                                                className={clsx(
                                                    "w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-300",
                                                    filters.bedrooms.includes(num)
                                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-110"
                                                        : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                                )}
                                            >
                                                {num}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="space-y-4">
                                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                        {t('filter.status', 'Status')}
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {['available', 'reserved', 'sold'].map(status => (
                                            <button
                                                key={status}
                                                onClick={() => toggleStatus(status)}
                                                className={clsx(
                                                    "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300",
                                                    filters.status.includes(status)
                                                        ? status === 'available' ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                                                            : status === 'reserved' ? "bg-amber-500 text-white shadow-lg shadow-amber-500/25"
                                                                : "bg-rose-500 text-white shadow-lg shadow-rose-500/25"
                                                        : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                                )}
                                            >
                                                {t(`common.${status}`, status)}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="mt-10 flex justify-end border-t border-border pt-6">
                                <button
                                    onClick={resetFilters}
                                    className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-destructive transition-colors uppercase tracking-wider"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    {t('filter.reset', 'Reset Filters')}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
