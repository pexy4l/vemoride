const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('auth_token');
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export const api = {
  // Auth
  signIn: (email, password) => request('/auth/signin', { method: 'POST', body: JSON.stringify({ email, password }) }),
  signOut: () => request('/auth/signout', { method: 'POST' }),
  getSession: () => request('/auth/session'),

  // Cars
  getCars: () => request('/cars'),
  getCar: (id) => request(`/cars/${id}`),
  getAvailableCars: () => request('/cars/available'),
  createCar: (data) => request('/cars', { method: 'POST', body: JSON.stringify(data) }),
  updateCar: (id, data) => request(`/cars/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCar: (id) => request(`/cars/${id}`, { method: 'DELETE' }),

  // Bookings
  getBookings: () => request('/bookings'),
  createBooking: (data) => request('/bookings', { method: 'POST', body: JSON.stringify(data) }),
  updateBookingStatus: (id, status) => request(`/bookings/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),

  // Contact
  sendContact: (data) => request('/contact', { method: 'POST', body: JSON.stringify(data) }),

  // Premium Cars
  getPremiumCars: () => request('/premium-cars'),
  createPremiumCar: (data) => request('/premium-cars', { method: 'POST', body: JSON.stringify(data) }),
  deletePremiumCar: (id) => request(`/premium-cars/${id}`, { method: 'DELETE' }),

  // Blocked Dates
  getBlockedDates: () => request('/blocked-dates'),
  getBlockedDatesForCar: (carId) => request(`/blocked-dates/car/${carId}`),
  blockDate: (data) => request('/blocked-dates', { method: 'POST', body: JSON.stringify(data) }),
  unblockDate: (id) => request(`/blocked-dates/${id}`, { method: 'DELETE' }),

  // Upload
  uploadFile: async (bucket, file) => {
    const token = localStorage.getItem('auth_token');
    const formData = new FormData();
    formData.append('file', file);
    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;
    const res = await fetch(`${API_BASE}/upload/${bucket}`, { method: 'POST', body: formData, headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Upload failed');
    return data.url;
  },
};
