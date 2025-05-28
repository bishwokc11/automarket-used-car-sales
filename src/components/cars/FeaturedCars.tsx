import React from 'react';
import { mockCars } from '../../data/mockCars';
import CarCard from './CarCard';

const FeaturedCars = () => {
  // Take the first 3 cars as featured
  const featuredCars = mockCars.slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {featuredCars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
};

export default FeaturedCars;