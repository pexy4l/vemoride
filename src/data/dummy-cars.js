export const users = [
  { id: 'u1', email: 'customer@test.com', password: 'pass', role: 'customer', name: 'Adebayo Ogunlesi', phone: '+234 801 234 5678', avatar: null },
  { id: 'u2', email: 'owner@test.com', password: 'pass', role: 'drivercarowner', name: 'Chidi Nwosu', phone: '+234 802 345 6789', avatar: null },
  { id: 'u3', email: 'admin@test.com', password: 'pass', role: 'admin', name: 'Admin User', phone: '+234 800 000 0000', avatar: null },
  { id: 'u4', email: 'owner2@test.com', password: 'pass', role: 'drivercarowner', name: 'Funke Adeyemi', phone: '+234 803 456 7890', avatar: null },
];

export const drivers = [
  { id: 'd1', ownerId: 'u2', name: 'Emeka Obi', phone: '+234 810 111 2222', rating: 4.8, trips: 124, avatar: null },
  { id: 'd2', ownerId: 'u2', name: 'Tunde Bakare', phone: '+234 810 333 4444', rating: 4.6, trips: 89, avatar: null },
  { id: 'd3', ownerId: 'u4', name: 'Yusuf Abdullahi', phone: '+234 810 555 6666', rating: 4.9, trips: 201, avatar: null },
];

const carTemplates = [
  { make: 'Toyota', model: 'Land Cruiser', year: 2023, type: 'SUV', seats: 7, transmission: 'Automatic', img: 'https://images.unsplash.com/photo-1625231334401-6cc491f89b3b?w=800', daily: 150000 },
  { make: 'Mercedes-Benz', model: 'E-Class', year: 2024, type: 'Sedan', seats: 5, transmission: 'Automatic', img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800', daily: 120000 },
  { make: 'Toyota', model: 'Camry', year: 2022, type: 'Sedan', seats: 5, transmission: 'Automatic', img: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800', daily: 60000 },
  { make: 'Lexus', model: 'RX 350', year: 2023, type: 'SUV', seats: 5, transmission: 'Automatic', img: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800', daily: 100000 },
  { make: 'Toyota', model: 'Hiace', year: 2021, type: 'Van', seats: 14, transmission: 'Manual', img: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800', daily: 80000 },
  { make: 'BMW', model: '5 Series', year: 2023, type: 'Sedan', seats: 5, transmission: 'Automatic', img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800', daily: 130000 },
  { make: 'Honda', model: 'Accord', year: 2022, type: 'Sedan', seats: 5, transmission: 'Automatic', img: 'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=800', daily: 55000 },
  { make: 'Range Rover', model: 'Sport', year: 2024, type: 'SUV', seats: 5, transmission: 'Automatic', img: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800', daily: 200000 },
  { make: 'Toyota', model: 'Corolla', year: 2021, type: 'Sedan', seats: 5, transmission: 'Automatic', img: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800', daily: 45000 },
  { make: 'Mercedes-Benz', model: 'GLE', year: 2023, type: 'SUV', seats: 5, transmission: 'Automatic', img: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800', daily: 180000 },
  { make: 'Toyota', model: 'Prado', year: 2022, type: 'SUV', seats: 7, transmission: 'Automatic', img: 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?w=800', daily: 140000 },
  { make: 'Hyundai', model: 'Elantra', year: 2023, type: 'Sedan', seats: 5, transmission: 'Automatic', img: 'https://images.unsplash.com/photo-1629897048514-3dd7414fe72a?w=800', daily: 50000 },
  { make: 'Lexus', model: 'ES 350', year: 2022, type: 'Sedan', seats: 5, transmission: 'Automatic', img: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800', daily: 110000 },
  { make: 'Toyota', model: 'Highlander', year: 2023, type: 'SUV', seats: 7, transmission: 'Automatic', img: 'https://images.unsplash.com/photo-1583267746897-2cf415887172?w=800', daily: 120000 },
  { make: 'Kia', model: 'Sportage', year: 2023, type: 'SUV', seats: 5, transmission: 'Automatic', img: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800', daily: 65000 },
];

const locations = [
  { state: 'Lagos', lga: 'Ikeja' },
  { state: 'Lagos', lga: 'Eti-Osa' },
  { state: 'Lagos', lga: 'Surulere' },
  { state: 'Lagos', lga: 'Lagos Island' },
  { state: 'Federal Capital Territory', lga: 'Municipal Area Council' },
  { state: 'Rivers', lga: 'Port Harcourt' },
  { state: 'Oyo', lga: 'Ibadan North' },
  { state: 'Kano', lga: 'Kano Municipal' },
  { state: 'Delta', lga: 'Warri South' },
  { state: 'Enugu', lga: 'Enugu North' },
];
const featureSets = [
  ['AC', 'Bluetooth', 'USB Charging'],
  ['AC', 'Leather Seats', 'Sunroof', 'GPS'],
  ['AC', 'Bluetooth', 'Backup Camera'],
  ['AC', 'Heated Seats', 'Apple CarPlay', 'Android Auto'],
  ['AC', 'WiFi', 'Tinted Windows'],
  ['AC', 'Bluetooth', 'Cruise Control', 'Parking Sensors'],
];

export const cars = Array.from({ length: 30 }, (_, i) => {
  const t = carTemplates[i % carTemplates.length];
  const ownerId = i % 2 === 0 ? 'u2' : 'u4';
  const driverIds = ['d1', 'd2', 'd3'];
  return {
    id: `c${i + 1}`,
    ownerId,
    make: t.make,
    model: t.model,
    year: t.year + (i > 14 ? 1 : 0),
    type: t.type,
    transmission: t.transmission,
    seats: t.seats,
    images: [t.img],
    description: `Well-maintained ${t.make} ${t.model} available for hire.`,
    status: 'available',
    rating: +(4 + Math.random() * 0.9).toFixed(1),
    trips: Math.floor(20 + Math.random() * 180),
    pricing: {
      daily: t.daily + (i > 14 ? 5000 : 0),
      weekly: t.daily * 6,
      monthly: t.daily * 25,
      weekend: Math.round(t.daily * 1.2),
      discount2Days: 5,
      discount7Days: 10,
      discount30Days: 20,
    },
    availability: { blockedDates: [], maintenance: false },
    withDriver: true,
    selfDrive: false,
    assignedDriverId: driverIds[i % 3],
    location: locations[i % locations.length].state,
    lga: locations[i % locations.length].lga,
    features: featureSets[i % featureSets.length],
  };
});
