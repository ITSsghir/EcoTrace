// Setup dotenv

const dotenv = require('dotenv')

// Load environment variables from .env file
dotenv.config();

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

// Import modules
const { initDatabase, createUser, checkLogin, getCarbonFootprint, updateCarbonFootprint, updateUserInfo } = require('./db.js');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        console.error('No token provided');
        return res.status(403).send('You are not logged in');
    }
    try {
        const decoded = jwt.verify(token, 'secretkey');
        req.user = decoded;
    } catch (err) {
        console.error('Invalid token:', err.message);
        return res.status(401).send('Invalid token');
    }
    return next();
};

// Register endpoint
app.post('/register', async (req, res) => {
    const { full_name, email, phone_number, password } = req.body;

    // Create User, if it's not valid, show an error and you must be able to make a new request with the correct inputs (not stopping the server)
    createUser(full_name, email, phone_number, password)
        .then(() => {
            // send the response from the promise
            res.status(200).send('User created');
            console.log('User created');
        })
        .catch((err) => {
            console.error('Error creating user:', err.message);
            res.status(500).send('Error creating user: ' + err.message);
        }
    );
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    checkLogin(email, password)
        .then((user) => {
            const token = jwt.sign({ email: user.email }, secretkey);
            res.cookie('token', token, { httpOnly: true });
            res.status(200).send('Login successful');
            console.log('Login successful');
        })
        .catch((err) => {
            console.error('Error logging in:', err.message);
            res.status(500).send('Error logging in: ' + err.message);
        }
    );
});
            

// Logout endpoint
app.get('/logout', verifyToken, (req, res) => {
    res.clearCookie('token');
    res.status(200).send('Logout successful');
});

// Get the carbon footprint of the user by id
app.get('/users/:id/carbon_footprint', verifyToken, (req, res) => {
    const { id } = req.params;
    // Get the carbon footprint of the user
    const daily = getCarbonFootprint(id, 'daily');
    const weekly = getCarbonFootprint(id, 'weekly');
    const monthly = getCarbonFootprint(id, 'monthly');
    const yearly = getCarbonFootprint(id, 'yearly');
    res.status(200).send({ daily, weekly, monthly, yearly });
});

// Modify the carbon footprint of the user by id
app.put('/users/:id/carbon_footprint/:added', verifyToken, (req, res) => {
    const { id } = req.params;
    const { added } = req.params;
    // Modify the carbon footprint of the user
    updateCarbonFootprint(id, added);
    res.status(200).send('Carbon footprint modified');
});

// Modify user info
app.put('/users/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    // Desired modifications must be passed in JSON format (Application/JSON)
    const { desiredModifications } = req.body;

    // Modify the user info
    updateUserInfo(id, desiredModifications);
    res.status(200).send('User info has been modified');
});

// Run the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    initDatabase();
});