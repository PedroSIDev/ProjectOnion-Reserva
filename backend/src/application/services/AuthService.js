const jwt = require('jsonwebtoken');
const { UserRepositorySQLite, createUserRepository } = require('../../infrastructure/repositories/UserRepositorySQLite');

class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async login(email, password) {
        // Busca usuário pelo email
        const users = await this.userRepository.getAll();
        const user = users.find(u => u.email === email);
        if (!user || user.password !== password) {
            throw new Error('Invalid credentials');
        }
        return this.generateToken(user);
    }

    async register({ name, email, password, role }) {
        // Verifica se o usuário já existe
        const users = await this.userRepository.getAll();
        if (users.find(u => u.email === email)) {
            throw new Error('User already exists');
        }
        // Cria o novo usuário
        const user = await this.userRepository.create({ name, email, password, role });
        return user;
    }

    generateToken(user) {
        const payload = {
            id: user.id,
            role: user.role,
        };
        return jwt.sign(payload, 'your_secret_key', { expiresIn: '1h' });
    }

    verifyToken(token) {
        return jwt.verify(token, 'your_secret_key');
    }
}

// Exporta uma instância já pronta, aguardando o banco abrir
let authServiceInstance = null;
async function getAuthService() {
    if (!authServiceInstance) {
        const userRepository = await createUserRepository();
        authServiceInstance = new AuthService(userRepository);
    }
    return authServiceInstance;
}

module.exports = { AuthService, getAuthService };