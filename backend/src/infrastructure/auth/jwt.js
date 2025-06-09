const jwt = require('jsonwebtoken');

const secretKey = 'your_secret_key'; // Change this to a secure key in production
const expiresIn = '1h'; // Token expiration time

const generateToken = (user) => {
    const payload = {
        id: user.id,
        role: user.role,
    };
    return jwt.sign(payload, secretKey, { expiresIn });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null;
    }
};

module.exports = {
    generateToken,
    verifyToken,
};