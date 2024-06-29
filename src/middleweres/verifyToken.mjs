import jwt from 'jsonwebtoken';
import Users from '../models/users.mjs';
import jwtSecret from '../config/jwt.mjs';

async function verifyToken(req, res, next) {
    try {
        const token = req.headers.authorization?.slice(7); // Extract token from header

        if (!token) {
            return res.status(401).send({ message: "No access!" });
        }

        const decoded = jwt.verify(token, jwtSecret); // Verify token
        const user = await Users.findOne({ _id: decoded._id, tokens: token }); // Check if user with token exists

        if (!user) {
            return res.status(401).send({ message: "Invalid token!" });
        }

        req.userId = decoded._id; // Set userId in the request object
        req.token = token; // Optionally, save token in request for later use if needed

        next(); // Proceed to next middleware or route handler
    } catch (error) {
        return res.status(401).send({ message: "Invalid token!" });
    }
}

export default verifyToken;
