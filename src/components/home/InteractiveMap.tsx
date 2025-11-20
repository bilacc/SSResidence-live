import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { apartments, type Apartment } from '../../data/apartments';
import { ApartmentModal } from './ApartmentModal';
import { AdvancedFilter } from './AdvancedFilter';
import { type IFilterState } from '../../context/FilterContext';
import clsx from 'clsx';

const InteractiveMap: React.FC = () => {
    const { t } = useTranslation();
    const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);
    const [hoveredApartment, setHoveredApartment] = useState<number | null>(null);

    const [filters, setFilters] = useState<IFilterState>({
        priceRange: [0, 1000000],
        sizeRange: [0, 200],
        bedrooms: [],
        status: []
    });

    const filteredApartments = useMemo(() => {
        return apartments.filter(apt => {
            // Price Filter
            if (apt.price < filters.priceRange[0] || apt.price > filters.priceRange[1]) return false;

            // Size Filter
            if (apt.size < filters.sizeRange[0] || apt.size > filters.sizeRange[1]) return false;

            // Bedrooms Filter
            if (filters.bedrooms.length > 0 && !filters.bedrooms.includes(apt.bedrooms)) return false;

            // Status Filter
            if (filters.status.length > 0 && !filters.status.includes(apt.status)) return false;

            return true;
        });
    }, [filters]);

    return (
        <section id="apartments" className="py-24 bg-accent dark:bg-slate-900 transition-colors">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-2 block">Find Your Home</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary dark:text-white mb-6">
                        {t('map.title')}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
                        {t('map.instruction')}
                    </p>
                </div>

                <AdvancedFilter
                    onFilterChange={setFilters}
                    initialMinPrice={200000}
                    initialMaxPrice={1000000}
                    initialMinSize={50}
                    initialMaxSize={200}
                />

                <div className="relative max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-slate-800 ring-1 ring-black/5">
                    {/* Building Render */}
                    <div className="relative aspect-[16/9] bg-gray-100">
                        <img
                            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=80"
                            alt="Building Exterior"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/5 pointer-events-none" />

                        {/* Hotspots */}
                        {filteredApartments.map((apt) => {
                            const isLeft = apt.coordinates.x < 50;
                            const isTop = apt.coordinates.y < 50;

                            return (
                                <button
                                    key={apt.id}
                                    onClick={() => setSelectedApartment(apt)}
                                    onMouseEnter={() => setHoveredApartment(apt.id)}
                                    onMouseLeave={() => setHoveredApartment(null)}
                                    style={{
                                        left: `${apt.coordinates.x}%`,
                                        top: `${apt.coordinates.y}%`,
                                    }}
                                    className={clsx(
                                        "absolute w-4 h-4 md:w-5 md:h-5 -ml-2 -mt-2 rounded-full border-2 border-white shadow-lg transition-all duration-300 z-10 cursor-pointer",
                                        apt.status === 'available' ? 'bg-emerald-500 hover:bg-emerald-400' :
                                            apt.status === 'reserved' ? 'bg-amber-500 hover:bg-amber-400' :
                                                'bg-rose-500 hover:bg-rose-400',
                                        hoveredApartment === apt.id ? 'scale-125 ring-4 ring-white/30' : 'scale-100'
                                    )}
                                    aria-label={`Apartment ${apt.unitNumber}`}
                                >

                                    {/* Tooltip */}
                                    <AnimatePresence>
                                        {hoveredApartment === apt.id && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9, x: isLeft ? 10 : -10 }}
                                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                className={clsx(
                                                    "absolute z-30 w-48 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm p-3 rounded-lg shadow-xl text-left pointer-events-none ring-1 ring-black/5",
                                                    isLeft ? "left-full ml-3" : "right-full mr-3",
                                                    isTop ? "top-0" : "bottom-0"
                                                )}
                                            >
                                                <div className="flex justify-between items-center mb-2">
                                                    <p className="font-serif font-bold text-base text-primary dark:text-white">Unit {apt.unitNumber}</p>
                                                    <span className={clsx(
                                                        "text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider",
                                                        apt.status === 'available' ? 'bg-emerald-100 text-emerald-700' :
                                                            apt.status === 'reserved' ? 'bg-amber-100 text-amber-700' :
                                                                'bg-rose-100 text-rose-700'
                                                    )}>
                                                        {apt.status}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-300 mb-2">
                                                    <span>{apt.bedrooms} Bed</span>
                                                    <span>{apt.size} m²</span>
                                                </div>
                                                <p className="text-base font-bold text-secondary">
                                                    €{apt.price.toLocaleString()}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </button>
                            );
                        })}
                    </div>

                    {/* Legend */}
                    <div className="p-6 flex flex-wrap justify-center gap-8 bg-white dark:bg-slate-800 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center">
                            <span className="w-3 h-3 rounded-full bg-emerald-500 mr-3 ring-2 ring-emerald-100"></span>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">{t('common.available')}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="w-3 h-3 rounded-full bg-amber-500 mr-3 ring-2 ring-amber-100"></span>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">{t('common.reserved')}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="w-3 h-3 rounded-full bg-rose-500 mr-3 ring-2 ring-rose-100"></span>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">{t('common.sold')}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedApartment && (
                    <ApartmentModal
                        apartment={selectedApartment}
                        onClose={() => setSelectedApartment(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default InteractiveMap;
