export interface Apartment {
    id: number;
    unitNumber: string;
    floor: number;
    bedrooms: number;
    size: number; // in sqm
    price: number;
    status: 'available' | 'reserved' | 'sold';
    description: string;
    coordinates: { x: number; y: number }; // Percentage from top-left
}

export const apartments: Apartment[] = Array.from({ length: 23 }, (_, i) => {
    const floor = Math.floor(i / 5) + 1;
    const size = 60 + (i % 5) * 15 + (floor * 5);
    const basePrice = 3500; // per sqm
    const price = size * basePrice * (1 + floor * 0.05);

    return {
        id: i + 1,
        unitNumber: `A${floor}0${(i % 5) + 1}`,
        floor: floor,
        bedrooms: (i % 3) + 1,
        size: size,
        price: Math.round(price),
        status: i % 7 === 0 ? 'sold' : i % 5 === 0 ? 'reserved' : 'available',
        description: `Luxury ${floor === 5 ? 'Penthouse' : 'Apartment'} with stunning city views and premium finishes.`,
        coordinates: {
            x: 10 + (i % 5) * 18,
            y: 80 - (floor - 1) * 15
        }
    };
});
