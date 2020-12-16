import { sign, verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { config } from 'dotenv';

config();

export const getToken = async (user) => {
    const body = { _id: user._id, email: user.email, name: user.name, isAdmin: user.isAdmin };
    return await sign(body, JWT_SECRET, { expiresIn: '48h' });
}


export const isAuth = async (req, res, next) => {
    const token = req.get('authorization');
    if (!token) return res.json({ ok: false, message: 'Token is not supplied.' });

    const onlyToken = token.split(' ')[1];
    try {

        const decoded = await verify(onlyToken, JWT_SECRET);
        const body = { name: decoded.name, email: decoded.email, isAdmin: decoded.isAdmin, _id: decoded._id };
        req.user = body;


    } catch (error) {
        if (error.expiredAt < new Date()) {
            return res.status(401).json({ ok: false, message: 'Token has expired. Please login again' })
        }
        return res.status(500).json({ message: 'Internal server error' });
    }

    next();
}

export const isAdmin = (req, res, next) => {
    return req.user.isAdmin ? next() : res.status(401).json({ message: 'Admin token is not valid' });
}

export const throwErrorMessage = (error, res) => {
    console.log(error);
    return res.status(500).json({ ok: false, message: 'Internal Server Error' });
}