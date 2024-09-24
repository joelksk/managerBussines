import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Business from '../models/business.js';

export const register = async (req, res) => {
    const { username, password, email, role, businessName } = req.body;

    try {
         let business = await Business.findOne({ name: businessName });

         if (!business) {
             business = new Business({ name: businessName });
             await business.save();
         }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: hashedPassword, email, role, business: business._id });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
        logger.error(error.message)
    }
};


export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
