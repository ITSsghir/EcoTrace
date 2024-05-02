
// Import the required modules
const { createConnection } = require('mysql');
const bcrypt = require('bcrypt');

const { checkInputs } = require('./utils.js');

// Number of salt rounds for bcrypt
const saltRounds =  10;

// Database on port 3306 localhost, user root, password root
let db;
const connectToDatabase = () => {
    return createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        port: process.env.MYSQL_PORT,
        database: process.env.MYSQL_DATABASE
    });
}

// Create schema for users (a user must have a Full Name, Email, Phone Number and Password)
const setupTables = (db) => {
    db.query(`CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone_number VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
    )`, (err) => {
        if (err) {
            console.error('Error creating users table:', err.message);
        } else {
            console.log('Created users table');
        }
    });

    // Create schema for carbon footprint (a user must have a daily, weekly, monthly and yearly carbon footprint (in kg) with a timestamp)
    db.query(`CREATE TABLE IF NOT EXISTS carbon_footprint (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        daily FLOAT NOT NULL,
        weekly FLOAT NOT NULL,
        monthly FLOAT NOT NULL,
        yearly FLOAT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) {
            console.error('Error creating carbon_footprint table:', err.message);
        } else {
            console.log('Created carbon_footprint table');
        }
    });
}

function initDatabase () {
    while (true) {
        try {
            db = connectToDatabase();
            db.connect((err) => {
                if (err) {
                    console.error('Database connection error:', err.message);
                    return;
                }
                console.log('Connected to the database');
                setupTables(db);
            });
            break;
        } catch (err) {
            console.error('Database connection error:', err.message);
        }
    }
}


// functions to create a user and get a user
async function createUser (full_name, email, phone_number, password) {

    // Check the inputs
    await checkInputs(full_name, email, phone_number, password);

    // Check if the user already exists (by email)
    const user = await getUser(email);
    if (user) {
        return new Promise((resolve, reject) => {
            reject(new Error('User already exists'));
        });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO users (full_name, email, phone_number, password) VALUES (?, ?, ?, ?)', [full_name, email, phone_number, hashedPassword], (err) => {
            if (err) {
                console.error('Error inserting user into database:', err.message);
                reject(err);
            }
            resolve();
        });
    });
}

async function getUser (email) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
            if (err) {
                console.error('Error querying database:', err.message);
                reject(err);
            }
            if (result.length > 1) {
                reject(new Error('More than one user found'));
            }
            if (result.length === 0) {
                resolve(null);
            }
            resolve(result[0]);
        });
    });
}

// Check login info
async function checkLogin (email, password) {
    if (!email || !password) {
        return new Promise((resolve, reject) => {
            reject(new Error('Missing required fields'));
        });
    }
    const user = await getUser(email);
    if (!user) {
        return new Promise((resolve, reject) => {
            reject(new Error('User not found'));
        });
    }
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                console.error('Error comparing passwords:', err.message);
                reject(err);
            }
            if (result) {
                resolve(user);
            } else {
                reject(new Error('Incorrect password'));
            }
        });
    });
}

// Modify user info
async function updateUserInfo(id, desiredModifications) {
    if (!desiredModifications) {
        return new Promise((resolve, reject) => {
            reject(new Error('No modifications specified'));
        });
    }
    const keys = Object.keys(desiredModifications);
    const values = Object.values(desiredModifications);
    let query = 'UPDATE users SET ';
    for (let i = 0; i < keys.length; i++) {
        query += `${keys[i]} = '${values[i]}'`;
        if (i !== keys.length - 1) {
            query += ', ';
        }
    }
    query += ` WHERE id = ${id}`;

    return new Promise((resolve, reject) => {
        db.query(query, (err) => {
            if (err) {
                console.error('Error modifying user:', err.message);
                reject(err);
            }
            resolve();
        });
    });
}

// Get the carbon footprint of the user by id
async function getCarbonFootprint (id, time_period) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT ${time_period} FROM carbon_footprint WHERE user_id = ${id}`, (err, result) => {
            if (err) {
                console.error('Error querying database:', err.message);
                reject(err);
            }
            if (result.length === 0) {
                resolve(null);
            }
            resolve(result[0][time_period]);
        });
    });
}

// Update the carbon footprint of the user by id
async function updateCarbonFootprint (id, added) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM carbon_footprint WHERE user_id = ${id}`, (err, result) => {
            if (err) {
                console.error('Error querying database:', err.message);
                reject(err);
            }
            if (result.length === 0) {
                // Add the carbon footprint to the existing one
                db.query('INSERT INTO carbon_footprint (user_id, daily, weekly, monthly, yearly) VALUES (?, ?, ?, ?, ?)', [id, added, added, added, added], (err) => {
                    if (err) {
                        console.error('Error inserting carbon footprint into database:', err.message);
                        reject(err);
                    }
                    resolve();
                });
            }
            // Add the carbon footprint to the existing one
            db.query(`UPDATE carbon_footprint SET daily = daily + ${added}, weekly = weekly + ${added}, monthly = monthly + ${added}, yearly = yearly + ${added5} WHERE user_id = ${id}`, (err) => {
                if (err) {
                    console.error('Error updating carbon footprint:', err.message);
                    reject(err);
                }
                resolve();
            });
        });
    });
}

// Export the functions
module.exports = {
    initDatabase,
    createUser,
    checkLogin,
    updateUserInfo,
    getCarbonFootprint,
    updateCarbonFootprint
};