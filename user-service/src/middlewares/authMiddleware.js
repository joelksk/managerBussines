import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.userId).populate('business'); // Incluimos el negocio

            if (!req.user) {
                return res.status(401).json({ message: 'Unauthorized User' });
            }

            next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid Token' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }
};
