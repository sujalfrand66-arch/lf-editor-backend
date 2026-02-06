const path = require('path');
const express = require('express');
const cors = require('cors');

const corsOptions = require('./config/corsOptions');
const uploadRoutes = require('./routes/uploadRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

const uploadsPath = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsPath));

app.use('/api', uploadRoutes);

app.use(errorHandler);

module.exports = app;
