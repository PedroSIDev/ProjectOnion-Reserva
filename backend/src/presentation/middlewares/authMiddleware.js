const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const AuthService = require('../../application/services/AuthService');

function authMiddleware(roles = []) {
  return async function (req, res, next) {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const decoded = await promisify(jwt.verify)(token, AuthService.getSecret());
        req.user = decoded;
        
        // ...verificação de autenticação/autorização...

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
  };
}

module.exports = authMiddleware;