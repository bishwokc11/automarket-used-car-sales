import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { mockCars } from '../data/mockCars';
import CarCard from '../components/cars/CarCard';
import { CarListing } from '../types/car';

const ListingsPage = () => {
  const [searchParams] = useSearchParams();
  const [cars, setCars] = useState<CarListing[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    make: searchParams.get('make') || '',
    model: searchParams.get('model') || '',
    yearMin: searchParams.get('year') || '',
    yearMax: '',
    priceMin: searchParams.get('priceMin') || '',
    priceMax: searchParams.get('priceMax') || '',
    bodyType: searchParams.get('bodyType') || '',
    mileageMax: ''
  });

  useEffect(() => {
    // Filter cars based on search parameters and filters
    let filteredCars = [...mockCars];

    if (filters.make) {
      filteredCars = filteredCars.filter(car => car.make === filters.make);
    }
    
    if (filters.model) {
      filteredCars = filteredCars.filter(car => car.model === filters.model);
    }
    
    if (filters.yearMin) {
      filteredCars = filteredCars.filter(car => car.year >= parseInt(filters.yearMin));
    }
    
    if (filters.yearMax) {
      filteredCars = filteredCars.filter(car => car.year <= parseInt(filters.yearMax));
    }
    
    if (filters.priceMin) {
      filteredCars = filteredCars.filter(car => car.price >= parseInt(filters.priceMin));
    }
    
    if (filters.priceMax) {
      filteredCars = filteredCars.filter(car => car.price <= parseInt(filters.priceMax));
    }
    
    if (filters.bodyType) {
      filteredCars = filteredCars.filter(car => car.bodyType === filters.bodyType);
    }
    
    if (filters.mileageMax) {
      filteredCars = filteredCars.filter(car => car.mileage <= parseInt(filters.mileageMax));
    }

    setCars(filteredCars);
  }, [filters, searchParams]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Used Cars</h1>
            <p className="text-gray-600">
              {cars.length} vehicles matching your criteria
            </p>
          </div>
          
          <button
            onClick={toggleFilters}
            className="flex items-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 mt-4 md:mt-0"
          >
            <Filter size={18} className="mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
        
        {showFilters && (
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <div className="flex items-center mb-4">
              <SlidersHorizontal size={20} className="mr-2 text-blue-900" />
              <h2 className="text-lg font-semibold">Filter Results</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-1">
                  Make
                </label>
                <select
                  id="make"
                  name="make"
                  value={filters.make}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any Make</option>
                  {Array.from(new Set(mockCars.map(car => car.make))).map(make => (
                    <option key={make} value={make}>{make}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
                  Model
                </label>
                <select
                  id="model"
                  name="model"
                  value={filters.model}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any Model</option>
                  {Array.from(new Set(mockCars.map(car => car.model))).map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="bodyType" className="block text-sm font-medium text-gray-700 mb-1">
                  Body Type
                </label>
                <select
                  id="bodyType"
                  name="bodyType"
                  value={filters.bodyType}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any Body Type</option>
                  {Array.from(new Set(mockCars.map(car => car.bodyType))).map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="yearMin" className="block text-sm font-medium text-gray-700 mb-1">
                  Year (Min)
                </label>
                <select
                  id="yearMin"
                  name="yearMin"
                  value={filters.yearMin}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">No Min</option>
                  {Array.from({ length: 21 }, (_, i) => 2005 + i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="yearMax" className="block text-sm font-medium text-gray-700 mb-1">
                  Year (Max)
                </label>
                <select
                  id="yearMax"
                  name="yearMax"
                  value={filters.yearMax}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">No Max</option>
                  {Array.from({ length: 21 }, (_, i) => 2005 + i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="priceMin" className="block text-sm font-medium text-gray-700 mb-1">
                  Price (Min)
                </label>
                <input
                  type="number"
                  id="priceMin"
                  name="priceMin"
                  placeholder="No Min"
                  value={filters.priceMin}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="priceMax" className="block text-sm font-medium text-gray-700 mb-1">
                  Price (Max)
                </label>
                <input
                  type="number"
                  id="priceMax"
                  name="priceMax"
                  placeholder="No Max"
                  value={filters.priceMax}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="mileageMax" className="block text-sm font-medium text-gray-700 mb-1">
                  Mileage (Max)
                </label>
                <input
                  type="number"
                  id="mileageMax"
                  name="mileageMax"
                  placeholder="No Max"
                  value={filters.mileageMax}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}
        
        {cars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No cars found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters to see more results.
            </p>
            <button
              onClick={() => setFilters({
                make: '',
                model: '',
                yearMin: '',
                yearMax: '',
                priceMin: '',
                priceMax: '',
                bodyType: '',
                mileageMax: ''
              })}
              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingsPage;