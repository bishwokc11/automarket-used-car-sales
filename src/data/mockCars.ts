import { CarListing } from '../types/car';

export const mockCars: CarListing[] = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Camry',
    year: 2022,
    price: 25999,
    mileage: 15280,
    exteriorColor: 'Silver',
    interiorColor: 'Black',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    engine: '2.5L 4-Cylinder',
    vin: 'ABC123456789DEF',
    bodyType: 'Sedan',
    features: [
      'Bluetooth',
      'Backup Camera',
      'Lane Departure Warning',
      'Adaptive Cruise Control',
      'Keyless Entry',
      'Heated Seats'
    ],
    description: 'This Toyota Camry is in excellent condition with low mileage. It features a smooth ride, great fuel economy, and plenty of modern safety features.',
    imageUrl: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    dealership: {
      id: 'd1',
      name: 'Toyota City',
      rating: 4.7,
      location: 'Los Angeles, CA',
      contactPhone: '(213) 555-1234',
      contactEmail: 'sales@toyotacity.com'
    }
  },
  {
    id: '2',
    make: 'Honda',
    model: 'Accord',
    year: 2021,
    price: 23500,
    mileage: 28450,
    exteriorColor: 'Blue',
    interiorColor: 'Gray',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    engine: '1.5L Turbo 4-Cylinder',
    vin: 'XYZ987654321UVW',
    bodyType: 'Sedan',
    features: [
      'Apple CarPlay',
      'Android Auto',
      'Sunroof',
      'Blind Spot Monitoring',
      'LED Headlights',
      'Push Button Start'
    ],
    description: 'This Honda Accord offers a perfect blend of comfort, efficiency, and reliability. The turbocharged engine provides excellent power while maintaining good fuel economy.',
    imageUrl: 'https://images.pexels.com/photos/892522/pexels-photo-892522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    dealership: {
      id: 'd2',
      name: 'Honda World',
      rating: 4.5,
      location: 'San Diego, CA',
      contactPhone: '(619) 555-4321',
      contactEmail: 'info@hondaworld.com'
    }
  },
  {
    id: '3',
    make: 'Ford',
    model: 'F-150',
    year: 2020,
    price: 32750,
    mileage: 35620,
    exteriorColor: 'Red',
    interiorColor: 'Black',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    engine: '3.5L V6 EcoBoost',
    vin: 'JKL543219876MNO',
    bodyType: 'Truck',
    features: [
      'Tow Package',
      'Bed Liner',
      'Navigation',
      'Leather Seats',
      '4x4',
      'Power Tailgate'
    ],
    description: 'This Ford F-150 is a capable workhorse with plenty of power for towing and hauling. The spacious cabin offers comfort for long drives and the latest technology features.',
    imageUrl: 'https://images.pexels.com/photos/2676446/pexels-photo-2676446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    dealership: {
      id: 'd3',
      name: 'Ford Country',
      rating: 4.3,
      location: 'Dallas, TX',
      contactPhone: '(214) 555-7890',
      contactEmail: 'sales@fordcountry.com'
    }
  },
  {
    id: '4',
    make: 'Chevrolet',
    model: 'Equinox',
    year: 2023,
    price: 28450,
    mileage: 7850,
    exteriorColor: 'White',
    interiorColor: 'Beige',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    engine: '1.5L Turbo 4-Cylinder',
    vin: 'PQR234567891STU',
    bodyType: 'SUV',
    features: [
      'Remote Start',
      'Parking Sensors',
      'Hands-free Liftgate',
      'Wireless Charging',
      'Panoramic Sunroof',
      'Teen Driver Technology'
    ],
    description: 'This Chevrolet Equinox offers the perfect balance of size, comfort, and efficiency. With low mileage and plenty of modern features, it\'s perfect for families.',
    imageUrl: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    dealership: {
      id: 'd4',
      name: 'Chevy SuperCenter',
      rating: 4.6,
      location: 'Chicago, IL',
      contactPhone: '(312) 555-3456',
      contactEmail: 'info@chevysupercenter.com'
    }
  },
  {
    id: '5',
    make: 'BMW',
    model: '3 Series',
    year: 2021,
    price: 39950,
    mileage: 18270,
    exteriorColor: 'Black',
    interiorColor: 'Brown',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    engine: '2.0L Turbo 4-Cylinder',
    vin: 'VWX765432109YZA',
    bodyType: 'Sedan',
    features: [
      'Premium Sound System',
      'Heads-up Display',
      'Sport Package',
      'Heated Steering Wheel',
      'Gesture Control',
      'Active Park Assist'
    ],
    description: 'This BMW 3 Series combines luxury, performance, and technology in a perfect package. The sporty handling and premium interior make every drive enjoyable.',
    imageUrl: 'https://images.pexels.com/photos/100656/pexels-photo-100656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    dealership: {
      id: 'd5',
      name: 'BMW Prestige',
      rating: 4.8,
      location: 'Miami, FL',
      contactPhone: '(305) 555-8901',
      contactEmail: 'sales@bmwprestige.com'
    }
  },
  {
    id: '6',
    make: 'Hyundai',
    model: 'Tucson',
    year: 2022,
    price: 26750,
    mileage: 11450,
    exteriorColor: 'Gray',
    interiorColor: 'Black',
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    engine: '1.6L Turbo Hybrid',
    vin: 'BCD987654321EFG',
    bodyType: 'SUV',
    features: [
      'Digital Key',
      '360-degree Camera',
      'Ambient Lighting',
      'Ventilated Seats',
      'Highway Driving Assist',
      'Smart Cruise Control'
    ],
    description: 'This Hyundai Tucson Hybrid offers excellent fuel economy and a distinctive design. The spacious interior and comprehensive warranty make it a smart choice.',
    imageUrl: 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    dealership: {
      id: 'd6',
      name: 'Hyundai Express',
      rating: 4.4,
      location: 'Seattle, WA',
      contactPhone: '(206) 555-2345',
      contactEmail: 'info@hyundaiexpress.com'
    }
  }
];