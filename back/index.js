// Setup dotenv
const dotenv = require('dotenv')
// Load environment variables from .env file
dotenv.config();

// Import the required modules
const { predict } = require('./vertex-vision-ai.js');

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
const { initDatabase, createUser, checkLogin, getCarbonFootprintAll, updateCarbonFootprint, updateUserInfon, getUser } = require('./db.js');

app.use(cookieParser());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        console.error('No token provided');
        const response = { message: 'No token provided, please log in' };
        return res.status(403).send(response);
    }
    try {
        const decoded = jwt.verify(token, 'secretkey');
        req.user = decoded;
    } catch (err) {
        console.error('Invalid token:', err.message);
        const response = { message: 'Invalid token: ' + err.message };
        return res.status(401).send(response);
    }
    return next();
};

const verifyJWTToken = (token) => {
    try {
        const decoded = jwt.verify(token, secretkey);
        return decoded;
    } catch (err) {
        console.error('Invalid token:', err.message);
        return null;
    }
}

// Register endpoint
app.post('/register', async (req, res) => {
    if (!req.body) {
        console.error('No body provided');
        const response = { message: 'No body provided' };
        res.status(400).send(response);
    }

    const { full_name, email, phone_number, password } = req.body;

    // Create User, if it's not valid, show an error and you must be able to make a new request with the correct inputs (not stopping the server)
    createUser(full_name, email, phone_number, password)
        .then(() => {
            // send the response from the promise
            console.log('User created');

            let response = {};
            // Add 'User created' message to response
            response.message = 'User created';

            // Log the user in
            checkLogin(email, password)
                .then((user) => {
                    const token = jwt.sign({ email: user.email }, secretkey);
                    // Add the user and token to the response
                    response.user = user;
                    response.token = token;
                    // Add the message 'Login successful' to the response
                    response.message += ', Login successful';
                    res.cookie('token', token);
                    console.log('Login successful');
                    res.status(200).send(response);
                })
                .catch((err) => {
                    console.error('Error logging in:', err.message);
                    const response = { message: 'Error logging in :' + err.message };
                    res.status(500).send(response);
                }
            );
        })
        .catch((err) => {
            console.error('Error creating user:', err.message);
            const response = { message: 'Error creating user :' + err.message };
            res.status(500).send(response);
        }
    );
    
});

// Login endpoint
app.post('/login', async (req, res) => {
    if (!req.body) {
        console.error('No body provided');
        const response = { message: 'Error: No body provided' };
        res.status(400).send(response);
    }

    const { email, password } = req.body;
    
    checkLogin(email, password)
        .then((user) => {
            const token = jwt.sign({ email: user.email }, secretkey);
            const response = { message: 'Login successful', user, token };
            res.cookie('token', token);
            console.log('Login successful');
            // send the response from the promise as JSON
            res.status(200).send(response);
        })
        .catch((err) => {
            console.error('Error logging in:', err.message);
            const response = { message: 'Error logging in :' + err.message };
            res.status(500).send(response);
        }
    );
});
            

// Logout endpoint
app.get('/logout', verifyToken, (req, res) => {
    res.clearCookie('token');
    console.log('Logout successful');
    const response = { message: 'Logout successful' };
    res.status(200).send('Logout successful');
});

app.get('/users/:token', verifyToken, (req, res) => {
    const { token } = req.params;
    const decoded = jwt.verify(token, secretkey);
    const { email } = decoded;
    console.log('User info requested');
    getUser(email)
        .then((user) => {
            const response = { message: 'User info retrieved', user };
            res.status(200).send(response);
        })
        .catch((err) => {
            console.error('Error getting user info:', err.message);
            const response = { message: 'Error getting user info: ' + err.message };
            res.status(500).send(response);
        }
    );
});

// Get the carbon footprint of the user by id
app.get('/users/:id/carbon_footprint', verifyToken, (req, res) => {
    const { id } = req.params;
    // Get the carbon footprint of the user
    getCarbonFootprintAll(id)
        .then((carbonFootprint) => {
            if (carbonFootprint === null) {
                // If no data found, send a specific response
                const response = { message: 'No carbon footprint data found for this user' };
                res.status(404).send(response);
            } else {
                let { daily, daily_unit, monthly, monthly_unit, total, total_unit } = carbonFootprint;
                // Add CO2e units to the response
                daily_unit += ' CO2e';
                monthly_unit += ' CO2e';
                total_unit += ' CO2e';
                const response = { message: 'Carbon footprint retrieved', daily, daily_unit, monthly, monthly_unit, total, total_unit };
                res.status(200).send(response);
            }
        })
        .catch((err) => {
            console.error('Error getting carbon footprint:', err.message);
            const response = { message: 'Error getting carbon footprint: ' + err.message };
            res.status(500).send(response);
        });
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

// Post request to get Vertex AI prediction
app.post('/predict', async (req, res) => {
    const { base64Image, extension , prompt } = req.body;
    
    console.log('Predicting...')

    try {
        // Get the prediction from Vertex AI
        const prediction = await predict(base64Image, extension, prompt);

        console.log('Prediction:', prediction);
        const response = { message: 'Prediction successful', prediction: prediction };
        res.status(200).send(response);
    } 
    catch (err) {
        console.error('Error predicting:', err.message);
        const response = { message: 'Error predicting: ' + err };
        res.status(500).send(response);
    }
});

app.get('/verify', verifyToken, (req, res) => {
    // Verify the token
    const response = { message: 'Token verified' };
    res.status(200).send(response);
});

// Run the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    initDatabase();
});