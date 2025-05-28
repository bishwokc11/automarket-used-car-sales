import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Activity, Fuel, Check } from 'lucide-react';
import { CarListing } from '../../types/car';
import { useComparison } from '../../contexts/ComparisonContext';

interface CarCardProps {
  car: CarListing;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const { addCarToCompare, removeCarFromCompare, isCarInComparison } = useComparison();
  const isInComparison = isCarInComparison(car.id);

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInComparison) {
      removeCarFromCompare(car.id);
    } else {
      addCarToCompare(car);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('en-US').format(mileage);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative">
        <img 
          src={car.imageUrl} 
          alt={`${car.year} ${car.make} ${car.model}`}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={handleCompareToggle}
          className={`absolute top-3 right-3 px-3 py-1 text-xs font-medium rounded-full ${
            isInComparison 
              ? 'bg-blue-900 text-white' 
              : 'bg-white text-blue-900 hover:bg-blue-100'
          }`}
        >
          {isInComparison ? 'Added to Compare' : '+ Compare'}
        </button>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold text-gray-900">
            {car.year} {car.make} {car.model}
          </h3>
          <span className="text-xl font-bold text-blue-900">
            {formatPrice(car.price)}
          </span>
        </div>
        
        <div className="text-sm text-gray-500 mb-4 flex items-center">
          <MapPin size={16} className="mr-1" />
          {car.dealership.name} | {car.dealership.location}
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-gray-700">
            <Calendar size={16} className="mr-2 text-blue-900" />
            <span>{car.year}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Activity size={16} className="mr-2 text-blue-900" />
            <span>{formatMileage(car.mileage)} mi</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Fuel size={16} className="mr-2 text-blue-900" />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Check size={16} className="mr-2 text-blue-900" />
            <span>{car.transmission}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {car.features.slice(0, 3).map((feature, index) => (
            <span 
              key={index}
              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
          {car.features.length > 3 && (
            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
              +{car.features.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <Link
            to={`/listings/${car.id}`}
            className="text-blue-900 hover:text-blue-700 font-medium"
          >
            View Details
          </Link>
          <div className="flex items-center">
            <span className="text-amber-500 mr-1">★</span>
            <span className="text-gray-700">{car.dealership.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;