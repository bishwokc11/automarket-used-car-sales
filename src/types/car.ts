export interface Dealership {
  id: string;
  name: string;
  rating: number;
  location: string;
  contactPhone: string;
  contactEmail: string;
}

export interface CarListing {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  exteriorColor: string;
  interiorColor: string;
  fuelType: string;
  transmission: string;
  engine: string;
  vin: string;
  bodyType: string;
  features: string[];
  description: string;
  imageUrl: string;
  dealership: Dealership;
}