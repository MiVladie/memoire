import handleError from '@/middleware/handleError';
import setHeaders from '@/middleware/setHeaders';

require('dotenv').config();

const express = require('express');

const app = express();

// Set headers for incoming requests
app.use(setHeaders);

// Parsing JSON middleware
app.use(express.json());

// Error handing
app.use(handleError);

// Running the server
app.listen(process.env.PORT || 8080);
