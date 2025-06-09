const express = require('express');
const router = express.Router();
const CreateMaintenance = require('../../application/usecases/CreateMaintenance');
const ListMaintenances = require('../../application/usecases/ListMaintenances');
const authMiddleware = require('../middlewares/authMiddleware');

// Route to create a new maintenance record
router.post('/', authMiddleware, async (req, res) => {
    try {
        const maintenanceData = req.body;
        const createMaintenance = new CreateMaintenance();
        const maintenance = await createMaintenance.execute(maintenanceData);
        res.status(201).json(maintenance);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to list all maintenance records
router.get('/', authMiddleware, async (req, res) => {
    try {
        const listMaintenances = new ListMaintenances();
        const maintenances = await listMaintenances.execute();
        res.status(200).json(maintenances);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;