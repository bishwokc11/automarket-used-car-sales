import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CarListing } from '../types/car';

interface ComparisonContextType {
  carsToCompare: CarListing[];
  addCarToCompare: (car: CarListing) => void;
  removeCarFromCompare: (carId: string) => void;
  clearComparison: () => void;
  isCarInComparison: (carId: string) => boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

interface ComparisonProviderProps {
  children: ReactNode;
}

export const ComparisonProvider: React.FC<ComparisonProviderProps> = ({ children }) => {
  const [carsToCompare, setCarsToCompare] = useState<CarListing[]>([]);

  const addCarToCompare = (car: CarListing) => {
    if (carsToCompare.length < 3 && !isCarInComparison(car.id)) {
      setCarsToCompare([...carsToCompare, car]);
    }
  };

  const removeCarFromCompare = (carId: string) => {
    setCarsToCompare(carsToCompare.filter(car => car.id !== carId));
  };

  const clearComparison = () => {
    setCarsToCompare([]);
  };

  const isCarInComparison = (carId: string) => {
    return carsToCompare.some(car => car.id === carId);
  };

  return (
    <ComparisonContext.Provider
      value={{
        carsToCompare,
        addCarToCompare,
        removeCarFromCompare,
        clearComparison,
        isCarInComparison
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = (): ComparisonContextType => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};