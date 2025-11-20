import React, { createContext, useContext, useState } from 'react';
// Context for filter state

export interface IFilterState {
    priceRange: [number, number];
    sizeRange: [number, number];
    bedrooms: number[];
    status: string[];
}

interface FilterContextType {
    filters: IFilterState;
    setFilters: React.Dispatch<React.SetStateAction<IFilterState>>;
    resetFilters: () => void;
    initialState: IFilterState;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterProviderProps {
    children: React.ReactNode;
    initialMinPrice?: number;
    initialMaxPrice?: number;
    initialMinSize?: number;
    initialMaxSize?: number;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({
    children,
    initialMinPrice = 0,
    initialMaxPrice = 1000000,
    initialMinSize = 0,
    initialMaxSize = 500,
}) => {
    const initialState: IFilterState = {
        priceRange: [initialMinPrice, initialMaxPrice],
        sizeRange: [initialMinSize, initialMaxSize],
        bedrooms: [],
        status: []
    };

    const [filters, setFilters] = useState<IFilterState>(initialState);

    const resetFilters = () => {
        setFilters(initialState);
    };

    return (
        <FilterContext.Provider value={{ filters, setFilters, resetFilters, initialState }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilter = () => {
    const context = useContext(FilterContext);
    if (context === undefined) {
        throw new Error('useFilter must be used within a FilterProvider');
    }
    return context;
};
