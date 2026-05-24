export const users = [
  { id: 'u1', email: 'customer@test.com', password: 'pass', role: 'customer', name: 'Adebayo Ogunlesi', phone: '+234 801 234 5678', avatar: null },
  { id: 'u2', email: 'owner@test.com', password: 'pass', role: 'drivercarowner', name: 'Chidi Nwosu', phone: '+234 802 345 6789', avatar: null, companyImage: '/vemoride4.svg', useCompanyImage: true },
  { id: 'u3', email: 'admin@test.com', password: 'pass', role: 'admin', name: 'Admin User', phone: '+234 800 000 0000', avatar: null },
  { id: 'u4', email: 'owner2@test.com', password: 'pass', role: 'drivercarowner', name: 'Funke Adeyemi', phone: '+234 803 456 7890', avatar: null, companyImage: null, useCompanyImage: false },
  { id: 'u5', email: 'owner3@test.com', password: 'pass', role: 'drivercarowner', name: 'Ibrahim Musa', phone: '+234 804 567 8901', avatar: null, companyImage: null, useCompanyImage: false },
];

export const drivers = [
  { id: 'd1', ownerId: 'u2', name: 'Emeka Obi', phone: '+234 810 111 2222', rating: 4.8, trips: 124, avatar: null },
  { id: 'd2', ownerId: 'u2', name: 'Tunde Bakare', phone: '+234 810 333 4444', rating: 4.6, trips: 89, avatar: null },
  { id: 'd3', ownerId: 'u4', name: 'Yusuf Abdullahi', phone: '+234 810 555 6666', rating: 4.9, trips: 201, avatar: null },
  { id: 'd4', ownerId: 'u5', name: 'Kola Adesanya', phone: '+234 810 777 8888', rating: 4.7, trips: 67, avatar: null },
];

const FEATURES = ['AC', 'Bluetooth Access', 'Leather Seats', 'Tinted Windows', 'USB Charging'];

const carData = [
  { make: 'Toyota', model: 'Land Cruiser', year: 2023, type: 'SUV', seats: 7, daily: 150000, imgs: ['https://images.unsplash.com/photo-1625231334401-6cc491f89b3b?w=800', 'https://images.unsplash.com/photo-1625231334168-24f0d76e2a4e?w=800', 'https://images.unsplash.com/photo-1625231334769-ae7e6e677064?w=800', 'https://images.unsplash.com/photo-1583267746897-2cf415887172?w=800', 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800'] },
  { make: 'Mercedes-Benz', model: 'E-Class', year: 2024, type: 'Sedan', seats: 5, daily: 120000, imgs: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800', 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800', 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800', 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800', 'https://images.unsplash.com/photo-1520050206757-3deee5e88e3e?w=800'] },
  { make: 'Toyota', model: 'Camry', year: 2022, type: 'Sedan', seats: 5, daily: 60000, imgs: ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800', 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=800', 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800', 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800', 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800'] },
  { make: 'Lexus', model: 'RX 350', year: 2023, type: 'SUV', seats: 5, daily: 100000, imgs: ['https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800', 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800', 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800', 'https://images.unsplash.com/photo-1519245659620-e859806a8d3b?w=800', 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800'] },
  { make: 'Toyota', model: 'Hiace', year: 2021, type: 'Van', seats: 14, daily: 80000, imgs: ['https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800', 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=800', 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800', 'https://images.unsplash.com/photo-1583267746897-2cf415887172?w=800', 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800'] },
  { make: 'BMW', model: '5 Series', year: 2023, type: 'Sedan', seats: 5, daily: 130000, imgs: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800', 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800', 'https://images.unsplash.com/photo-1520050206757-3deee5e88e3e?w=800', 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800', 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800'] },
  { make: 'Honda', model: 'Accord', year: 2022, type: 'Sedan', seats: 5, daily: 55000, imgs: ['https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=800', 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800', 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800', 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=800', 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800'] },
  { make: 'Range Rover', model: 'Sport', year: 2024, type: 'SUV', seats: 5, daily: 200000, imgs: ['https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800', 'https://images.unsplash.com/photo-1519245659620-e859806a8d3b?w=800', 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800', 'https://images.unsplash.com/photo-1625231334401-6cc491f89b3b?w=800', 'https://images.unsplash.com/photo-1583267746897-2cf415887172?w=800'] },
  { make: 'Toyota', model: 'Corolla', year: 2021, type: 'Sedan', seats: 5, daily: 45000, imgs: ['https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800', 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800', 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800', 'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=800', 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800'] },
  { make: 'Mercedes-Benz', model: 'GLE', year: 2024, type: 'SUV', seats: 5, daily: 180000, imgs: ['https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800', 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800', 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800', 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800', 'https://images.unsplash.com/photo-1520050206757-3deee5e88e3e?w=800'] },
  { make: 'Toyota', model: 'Prado', year: 2022, type: 'SUV', seats: 7, daily: 140000, imgs: ['https://images.unsplash.com/photo-1594502184342-2e12f877aa73?w=800', 'https://images.unsplash.com/photo-1625231334401-6cc491f89b3b?w=800', 'https://images.unsplash.com/photo-1625231334168-24f0d76e2a4e?w=800', 'https://images.unsplash.com/photo-1583267746897-2cf415887172?w=800', 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800'] },
  { make: 'Hyundai', model: 'Elantra', year: 2023, type: 'Sedan', seats: 5, daily: 50000, imgs: ['https://images.unsplash.com/photo-1629897048514-3dd7414fe72a?w=800', 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800', 'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=800', 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=800', 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800'] },
  { make: 'Lexus', model: 'ES 350', year: 2022, type: 'Sedan', seats: 5, daily: 110000, imgs: ['https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800', 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800', 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800', 'https://images.unsplash.com/photo-1519245659620-e859806a8d3b?w=800', 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800'] },
  { make: 'Toyota', model: 'Highlander', year: 2023, type: 'SUV', seats: 7, daily: 120000, imgs: ['https://images.unsplash.com/photo-1583267746897-2cf415887172?w=800', 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800', 'https://images.unsplash.com/photo-1519245659620-e859806a8d3b?w=800', 'https://images.unsplash.com/photo-1625231334401-6cc491f89b3b?w=800', 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800'] },
];

const locations = [
  { state: 'Lagos', lga: 'Ikeja' },
  { state: 'Lagos', lga: 'Eti-Osa' },
  { state: 'Lagos', lga: 'Surulere' },
  { state: 'Lagos', lga: 'Lagos Island' },
  { state: 'Lagos', lga: 'Alimosho' },
  { state: 'Federal Capital Territory', lga: 'Municipal Area Council' },
  { state: 'Federal Capital Territory', lga: 'Bwari' },
  { state: 'Rivers', lga: 'Port Harcourt' },
  { state: 'Oyo', lga: 'Ibadan North' },
  { state: 'Kano', lga: 'Kano Municipal' },
  { state: 'Delta', lga: 'Warri South' },
  { state: 'Enugu', lga: 'Enugu North' },
  { state: 'Ogun', lga: 'Abeokuta South' },
  { state: 'Kaduna', lga: 'Kaduna North' },
];

const ownerIds = ['u2', 'u4', 'u5', 'u2', 'u4'];
const driverIds = ['d1', 'd2', 'd3', 'd4'];

export const cars = Array.from({ length: 70 }, (_, i) => {
  const t = carData[i % carData.length];
  const loc = locations[i % locations.length];
  const featureCount = 2 + (i % 4);
  const features = FEATURES.slice(0, featureCount);
  return {
    id: `c${i + 1}`,
    ownerId: ownerIds[i % ownerIds.length],
    make: t.make,
    model: t.model,
    year: t.year + (i >= 42 ? 1 : 0),
    type: t.type,
    transmission: 'Automatic',
    seats: t.seats,
    images: t.imgs,
    description: `Well-maintained ${t.make} ${t.model} available for hire with professional driver.`,
    status: 'available',
    rating: +(4 + Math.random() * 0.9).toFixed(1),
    trips: Math.floor(20 + Math.random() * 180),
    pricing: {
      daily: t.daily,
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
    assignedDriverId: driverIds[i % driverIds.length],
    location: loc.state,
    lga: loc.lga,
    features,
    outOfState: i % 3 === 0,
  };
});
