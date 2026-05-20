const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Easy Luxury Drive API',
    version: '1.0.0',
    description: 'Backend API for Easy Luxury Drive car rental platform',
  },
  servers: [
    { url: 'http://localhost:3001/api', description: 'Local development' },
  ],
  components: {
    securitySchemes: {
      BearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    },
    schemas: {
      Car: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          make: { type: 'string', example: 'Toyota' },
          model: { type: 'string', example: 'Prado' },
          year: { type: 'integer', example: 2023 },
          type: { type: 'string', enum: ['Sedan', 'SUV', 'Van'] },
          transmission: { type: 'string', enum: ['Automatic', 'Manual'] },
          seats: { type: 'integer', example: 5 },
          luggage: { type: 'integer', example: 3 },
          daily_rate: { type: 'integer', example: 150000 },
          airport_pickup: { type: 'boolean' },
          status: { type: 'string', enum: ['Available', 'Unavailable'] },
          images: { type: 'array', items: { type: 'string', format: 'uri' } },
          description: { type: 'string' },
        },
      },
      Booking: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          car_id: { type: 'string', format: 'uuid' },
          car_name: { type: 'string' },
          pickup_date: { type: 'string', format: 'date' },
          pickup_time: { type: 'string' },
          return_date: { type: 'string', format: 'date' },
          return_time: { type: 'string' },
          pickup_location: { type: 'string' },
          full_name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          phone: { type: 'string' },
          notes: { type: 'string' },
          status: { type: 'string', enum: ['Pending', 'Confirmed', 'Declined'] },
        },
      },
      PremiumCar: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          name: { type: 'string', example: 'Toyota Prado 2023' },
          alt: { type: 'string', example: 'White Toyota Prado' },
          image: { type: 'string', format: 'uri' },
        },
      },
      BlockedDate: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          car_id: { type: 'string', format: 'uuid' },
          blocked_date: { type: 'string', format: 'date' },
        },
      },
      ContactMessage: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          phone: { type: 'string' },
          message: { type: 'string' },
        },
      },
      Error: {
        type: 'object',
        properties: {
          error: { type: 'string' },
        },
      },
    },
  },
  paths: {
    '/auth/signin': {
      post: {
        tags: ['Auth'],
        summary: 'Sign in',
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['email', 'password'], properties: { email: { type: 'string', format: 'email' }, password: { type: 'string' } } } } } },
        responses: { 200: { description: 'Session data with access token' }, 401: { description: 'Invalid credentials' } },
      },
    },
    '/auth/signout': {
      post: {
        tags: ['Auth'],
        summary: 'Sign out',
        security: [{ BearerAuth: [] }],
        responses: { 200: { description: 'Signed out' } },
      },
    },
    '/auth/session': {
      get: {
        tags: ['Auth'],
        summary: 'Get current user session',
        security: [{ BearerAuth: [] }],
        responses: { 200: { description: 'Current user data' }, 401: { description: 'Not authenticated' } },
      },
    },
    '/cars': {
      get: {
        tags: ['Cars'],
        summary: 'Get all cars',
        responses: { 200: { description: 'List of cars', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Car' } } } } } },
      },
      post: {
        tags: ['Cars'],
        summary: 'Create a car',
        security: [{ BearerAuth: [] }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Car' } } } },
        responses: { 200: { description: 'Created car' }, 400: { description: 'Validation error' } },
      },
    },
    '/cars/available': {
      get: {
        tags: ['Cars'],
        summary: 'Get available cars (id, make, model, daily_rate only)',
        responses: { 200: { description: 'List of available cars' } },
      },
    },
    '/cars/{id}': {
      get: {
        tags: ['Cars'],
        summary: 'Get a car by ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
        responses: { 200: { description: 'Car details' }, 404: { description: 'Car not found' } },
      },
      put: {
        tags: ['Cars'],
        summary: 'Update a car',
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Car' } } } },
        responses: { 200: { description: 'Updated car' }, 400: { description: 'Validation error' } },
      },
      delete: {
        tags: ['Cars'],
        summary: 'Delete a car',
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
        responses: { 200: { description: 'Deleted' }, 400: { description: 'Error' } },
      },
    },
    '/bookings': {
      get: {
        tags: ['Bookings'],
        summary: 'Get all bookings',
        security: [{ BearerAuth: [] }],
        responses: { 200: { description: 'List of bookings', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Booking' } } } } } },
      },
      post: {
        tags: ['Bookings'],
        summary: 'Create a booking',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Booking' } } } },
        responses: { 200: { description: 'Created booking' }, 400: { description: 'Validation error' } },
      },
    },
    '/bookings/{id}/status': {
      patch: {
        tags: ['Bookings'],
        summary: 'Update booking status',
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { status: { type: 'string', enum: ['Pending', 'Confirmed', 'Declined'] } } } } } },
        responses: { 200: { description: 'Updated booking' } },
      },
    },
    '/contact': {
      post: {
        tags: ['Contact'],
        summary: 'Send a contact message',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/ContactMessage' } } } },
        responses: { 200: { description: 'Message sent' }, 400: { description: 'Error' } },
      },
    },
    '/premium-cars': {
      get: {
        tags: ['Premium Cars'],
        summary: 'Get all premium cars',
        responses: { 200: { description: 'List of premium cars', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/PremiumCar' } } } } } },
      },
      post: {
        tags: ['Premium Cars'],
        summary: 'Add a premium car',
        security: [{ BearerAuth: [] }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/PremiumCar' } } } },
        responses: { 200: { description: 'Created' }, 400: { description: 'Error' } },
      },
    },
    '/premium-cars/{id}': {
      delete: {
        tags: ['Premium Cars'],
        summary: 'Delete a premium car',
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
        responses: { 200: { description: 'Deleted' } },
      },
    },
    '/blocked-dates': {
      get: {
        tags: ['Blocked Dates'],
        summary: 'Get all blocked dates',
        security: [{ BearerAuth: [] }],
        responses: { 200: { description: 'List of blocked dates', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/BlockedDate' } } } } } },
      },
      post: {
        tags: ['Blocked Dates'],
        summary: 'Block a date for a car',
        security: [{ BearerAuth: [] }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['car_id', 'blocked_date'], properties: { car_id: { type: 'string', format: 'uuid' }, blocked_date: { type: 'string', format: 'date' } } } } } },
        responses: { 200: { description: 'Date blocked' } },
      },
    },
    '/blocked-dates/car/{carId}': {
      get: {
        tags: ['Blocked Dates'],
        summary: 'Get blocked dates for a specific car',
        parameters: [{ name: 'carId', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
        responses: { 200: { description: 'List of blocked dates for the car' } },
      },
    },
    '/blocked-dates/{id}': {
      delete: {
        tags: ['Blocked Dates'],
        summary: 'Unblock a date',
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
        responses: { 200: { description: 'Unblocked' } },
      },
    },
    '/upload/{bucket}': {
      post: {
        tags: ['Upload'],
        summary: 'Upload a file to storage',
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'bucket', in: 'path', required: true, schema: { type: 'string', enum: ['car_images', 'premium_car_images'] } }],
        requestBody: { required: true, content: { 'multipart/form-data': { schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } } } } } },
        responses: { 200: { description: 'Upload successful', content: { 'application/json': { schema: { type: 'object', properties: { url: { type: 'string', format: 'uri' } } } } } } },
      },
    },
  },
};

export default swaggerDefinition;
