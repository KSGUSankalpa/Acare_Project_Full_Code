/*const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded.user; // Changed to `req.user` for better structure
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authenticate;*/

/*

const { User } = require("../models/Hospital_login");

const Auth = (req, res, next) => {
    let token = req.header("x-auth-token") || req.header("Authorization");

    if(token) {
        if(token.startsWith("Bearer")) {
            token = token.slice(7, token.length);
        }

        User.findByToken(token, (err, user) => {
            if(err) throw err;

            if(!user) {
                res.status(400).json({
                    success: false,
                    message: "No valid token provided"
                });
            }

            req.token = token;
            req.user = username;
            
            next();
        });
    } else {
        res.status(400).json({
            success: false,
            message: "No valid token provided"
        });
    }
}

module.exports = Auth;*/
/*
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
    // Retrieve token from header (x-auth-token or Authorization)
    let token = req.header('x-auth-token') || req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // If token starts with "Bearer ", remove the "Bearer " part
    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
    }
    console.log('Token:', token);

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, secretKey);
        
           console.log('Decoded token:', decoded);
        
        // Attach the user information to the request (e.g., decoded username)
        req.user = decoded.user; // Assumes the JWT token has a 'user' payload
        
        // Proceed to the next middleware/route handler
        next();
    } catch (err) {
        // Invalid token case
        return res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authenticate;*/

/*
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables
const secretKey = process.env.JWT_SECRET; // Get secret key from .env file

const authenticate = (req, res, next) => {
    // Retrieve token from 'x-auth-token' or 'Authorization' headers
    let token = req.header('x-auth-token') || req.header('Authorization');

    if (!token) {
        // If no token is provided, return a 401 error
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // If token starts with "Bearer ", remove the "Bearer " part
    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
    }

    console.log('Token:', token); // Log token for debugging

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, secretKey);

        console.log('Decoded token:', decoded); // Log decoded token for debugging

        // Attach the user information from the token to the request
        req.user = decoded.user; // Assumes token contains a 'user' field

        // Continue to the next middleware or route
        next();
    } catch (err) {
        console.error('Token verification failed:', err.message); // Log error for debugging
        return res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authenticate;
*/
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables
const secretKey = process.env.JWT_SECRET; // Get secret key from .env file

const authenticate = (req, res, next) => {
    // Retrieve token from 'x-auth-token' or 'Authorization' headers
    let token = req.header('x-auth-token') || req.header('Authorization');

    if (!token) {
        // If no token is provided, return a 401 error
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
    }

    console.log('Token:', token); // Log token for debugging

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, secretKey);

        console.log('Decoded token:', decoded); // Log decoded token for debugging

        // Attach the user information from the token to the request
        req.user = decoded.user;

        // Continue to the next middleware or route
        next();
    } catch (err) {
        console.error('Token verification failed:', err.message); // Log error for debugging
        return res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authenticate;

