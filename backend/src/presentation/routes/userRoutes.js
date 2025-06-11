const express = require('express');
const { CreateUser } = require('../../application/usecases/CreateUser');
const { ListUsers } = require('../../application/usecases/ListUsers');
const { AuthService } = require('../../application/services/AuthService');
const authMiddleware = require('../middlewares/authMiddleware');
const { UserRepositorySQLite, createUserRepository } = require('../../infrastructure/repositories/UserRepositorySQLite');

const router = express.Router();

let userRepository;
createUserRepository().then(repo => { userRepository = repo; });

// Route to create a new user
router.get('/', authMiddleware, async (req, res) => {
    try {
        const listUsers = new ListUsers(userRepository);
        console.log('Chamando listagem de usuários');
        const users = await listUsers.execute();
        console.log('Usuários encontrados:', users);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to list all users (admin only)
router.get('/', authMiddleware, async (req, res) => {
    try {
        const listUsers = new ListUsers(userRepository);
        console.log('Chamando listagem de usuários');
        const users = await listUsers.execute();
        console.log('Usuários encontrados:', users);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to get a user by ID
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const user = await userRepository.getById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to update a user (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const updatedUser = await userRepository.update(req.params.id, req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to delete a user (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await userRepository.delete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;