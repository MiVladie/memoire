require('dotenv').config();

import express from 'express';

import setHeaders from '@/middleware/setHeaders';
import handleError from '@/middleware/handleError';

import router from '@/routes';

const app = express();

// Set headers for incoming requests
app.use(setHeaders);

// Parsing JSON middleware
app.use(express.json());

// Routes handing
app.use('/api', router);

// Error handing
app.use(handleError);

// Running the server
app.listen(process.env.PORT || 8080);
