export { users, drivers, cars } from './dummy-cars';

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
