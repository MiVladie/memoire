require('dotenv').config();

import express from 'express';

import setHeaders from '@/middleware/setHeaders';
import handleError from '@/middleware/handleError';

import router from '@/routes';
import uploads from '@/routes/uploads';

import * as Server from '@/config/server';

const app = express();

// Set headers for incoming requests
app.use(setHeaders);

// Parsing JSON middleware
app.use(express.json());

// Routes handing
app.use('/api', router);

// Static files
app.use('/shared', uploads);

// Error handing
app.use(handleError);

// Running the server
app.listen(Server.PORT);
