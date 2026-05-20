import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDefinition from './swagger.js';
import authRoutes from './routes/auth.js';
import carsRoutes from './routes/cars.js';
import bookingsRoutes from './routes/bookings.js';
import contactRoutes from './routes/contact.js';
import premiumCarsRoutes from './routes/premiumCars.js';
import blockedDatesRoutes from './routes/blockedDates.js';
import uploadRoutes from './routes/upload.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

app.use('/api/auth', authRoutes);
app.use('/api/cars', carsRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/premium-cars', premiumCarsRoutes);
app.use('/api/blocked-dates', blockedDatesRoutes);
app.use('/api/upload', uploadRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
});
