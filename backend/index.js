const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./src/presentation/routes/authRoutes');
const userRoutes = require('./src/presentation/routes/userRoutes');
const vehicleRoutes = require('./src/presentation/routes/vehicleRoutes');
const maintenanceRoutes = require('./src/presentation/routes/maintenanceRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/maintenances', maintenanceRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});