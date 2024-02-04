import errorHandler from "./error.js";
import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return next(errorHandler(401, 'unauthorized'));
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return next(errorHandler(403, 'forbidden'));

        req.user = user;
        next();
    });
};

export default verifyToken;
