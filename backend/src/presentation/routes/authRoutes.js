const express = require('express');
const { getAuthService } = require('../../application/services/AuthService');
const router = express.Router();

// Route for user login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const authService = await getAuthService();
        const token = await authService.login(email, password);
        res.json({ token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});

// Route for user registration
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const authService = await getAuthService();
        const user = await authService.register({ name, email, password, role });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;