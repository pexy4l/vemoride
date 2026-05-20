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

export const cars = [
  {
    id: 'c1', ownerId: 'u2', make: 'Toyota', model: 'Land Cruiser', year: 2023, type: 'SUV',
    transmission: 'Automatic', seats: 7, images: ['https://images.unsplash.com/photo-1625231334401-6cc491f89b3b?w=800'],
    description: 'Premium SUV with full leather interior, perfect for executive travel.',
    status: 'available', rating: 4.7, trips: 45,
    pricing: { daily: 150000, weekly: 900000, monthly: 3200000, weekend: 180000, discount2Days: 5, discount7Days: 10, discount30Days: 20 },
    availability: { blockedDates: ['2026-05-25', '2026-05-26'], maintenance: false },
    withDriver: true, selfDrive: true, assignedDriverId: 'd1',
    location: 'Lagos Island',
  },
  {
    id: 'c2', ownerId: 'u2', make: 'Mercedes-Benz', model: 'E-Class', year: 2024, type: 'Sedan',
    transmission: 'Automatic', seats: 5, images: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800'],
    description: 'Elegant sedan for business meetings and airport transfers.',
    status: 'available', rating: 4.9, trips: 78,
    pricing: { daily: 120000, weekly: 750000, monthly: 2800000, weekend: 140000, discount2Days: 5, discount7Days: 12, discount30Days: 25 },
    availability: { blockedDates: [], maintenance: false },
    withDriver: true, selfDrive: false, assignedDriverId: 'd2',
    location: 'Victoria Island',
  },
  {
    id: 'c3', ownerId: 'u4', make: 'Toyota', model: 'Camry', year: 2022, type: 'Sedan',
    transmission: 'Automatic', seats: 5, images: ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800'],
    description: 'Reliable and comfortable sedan for daily use.',
    status: 'available', rating: 4.5, trips: 112,
    pricing: { daily: 60000, weekly: 350000, monthly: 1200000, weekend: 70000, discount2Days: 5, discount7Days: 10, discount30Days: 15 },
    availability: { blockedDates: ['2026-06-01'], maintenance: false },
    withDriver: true, selfDrive: true, assignedDriverId: 'd3',
    location: 'Ikeja',
  },
  {
    id: 'c4', ownerId: 'u4', make: 'Lexus', model: 'RX 350', year: 2023, type: 'SUV',
    transmission: 'Automatic', seats: 5, images: ['https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800'],
    description: 'Luxury SUV with premium comfort and smooth ride.',
    status: 'available', rating: 4.8, trips: 56,
    pricing: { daily: 100000, weekly: 600000, monthly: 2200000, weekend: 120000, discount2Days: 5, discount7Days: 10, discount30Days: 20 },
    availability: { blockedDates: [], maintenance: false },
    withDriver: true, selfDrive: true, assignedDriverId: null,
    location: 'Lekki',
  },
  {
    id: 'c5', ownerId: 'u2', make: 'Toyota', model: 'Hiace', year: 2021, type: 'Van',
    transmission: 'Manual', seats: 14, images: ['https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800'],
    description: 'Spacious van for group travel and events.',
    status: 'available', rating: 4.3, trips: 34,
    pricing: { daily: 80000, weekly: 480000, monthly: 1600000, weekend: 95000, discount2Days: 5, discount7Days: 8, discount30Days: 15 },
    availability: { blockedDates: [], maintenance: false },
    withDriver: true, selfDrive: false, assignedDriverId: 'd1',
    location: 'Surulere',
  },
];

export const bookings = [
  {
    id: 'b1', customerId: 'u1', carId: 'c1', ownerId: 'u2', driverId: 'd1',
    pickupDate: '2026-05-22', returnDate: '2026-05-24', pickupLocation: 'Lagos Airport',
    dropoffLocation: 'Victoria Island', status: 'confirmed', withDriver: true,
    totalPrice: 285000, createdAt: '2026-05-19',
  },
  {
    id: 'b2', customerId: 'u1', carId: 'c3', ownerId: 'u4', driverId: 'd3',
    pickupDate: '2026-06-05', returnDate: '2026-06-10', pickupLocation: 'Ikeja Office',
    dropoffLocation: 'Ikeja Office', status: 'pending', withDriver: true,
    totalPrice: 330000, createdAt: '2026-05-20',
  },
];

export const ratings = [
  { id: 'r1', bookingId: 'b1', fromUserId: 'u1', toUserId: 'u2', type: 'owner', score: 5, comment: 'Excellent service, very professional.' },
  { id: 'r2', bookingId: 'b1', fromUserId: 'u1', toUserId: 'd1', type: 'driver', score: 5, comment: 'Emeka was punctual and friendly.' },
  { id: 'r3', bookingId: 'b1', fromUserId: 'u1', carId: 'c1', type: 'car', score: 4, comment: 'Great car, very clean.' },
];

export const notifications = [
  { id: 'n1', userId: 'u1', message: 'Your booking for Toyota Land Cruiser has been confirmed.', read: false, createdAt: '2026-05-19T10:00:00' },
  { id: 'n2', userId: 'u2', message: 'New booking request from Adebayo Ogunlesi.', read: true, createdAt: '2026-05-19T09:30:00' },
  { id: 'n3', userId: 'u4', message: 'New booking request for Toyota Camry.', read: false, createdAt: '2026-05-20T14:00:00' },
];
