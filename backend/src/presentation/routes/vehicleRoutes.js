const express = require('express');
const CreateVehicle = require('../../application/usecases/CreateVehicle');
const ListVehicles = require('../../application/usecases/ListVehicles');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Create a new vehicle
router.post('/', authMiddleware(['admin']), async (req, res) => {
    try {
        const vehicleData = req.body;
        const createVehicle = new CreateVehicle();
        const vehicle = await createVehicle.execute(vehicleData);
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// List all vehicles
router.get('/', authMiddleware(['admin', 'collaborator']), async (req, res) => {
    try {
        const listVehicles = new ListVehicles();
        const vehicles = await listVehicles.execute();
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Export the router
module.exports = router;