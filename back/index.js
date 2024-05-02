// Setup dotenv
require('dotenv').config();

// Setup server (Express) 
const express = require('express');
const app = express();
const port = 3000;

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// Import the required modules
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const secretkey = process.env.SECRET_KEY;

// Connect to the database
const dbManager = require('./db');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }
    try {
        const decoded = jwt.verify(token, 'secretkey');
        req.user = decoded;
    } catch (err) {
        return res.status(401).send('Invalid token');
    }
    return next();
};

// Register endpoint
app.post('/register', async (req, res) => {
    const { full_name, email, phone_number, password } = req.body;
    
    dbManager.createUser(full_name, email, phone_number, password)
        .then(() => {
            // send the response from the promise
            res.status(200).send('User created');
        })
        .catch((err) => {
            console.error('Error creating user:', err.message);
            res.status(500).send('Error creating user: ' + err.message);
        });
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    dbManager.checkLogin(email, password)
        .then((user) => {
            const token = jwt.sign({ email: user.email }, secretkey);
            res.cookie('token', token, { httpOnly: true });
            res.status(200).send('Login successful');
        })
        .catch((err) => {
            console.error('Error logging in:', err.message);
        });
});
            

// Logout endpoint
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).send('Logout successful');
});

// Protected route example
app.get('/protected', verifyToken, (req, res) => {
    res.status(200).send('Protected route accessed');
});

// Run the server
app.listen(port, () => {
    dbManager.initDatabase();
    console.log(`Server running on port ${port}`);
});