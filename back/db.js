
const { createConnection } = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

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

const initDatabase = () => {
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
const createUser = async (full_name, email, phone_number, password) => {
    if (!full_name || !email || !phone_number || !password) {
        return new Promise((resolve, reject) => {
            reject(new Error('Missing required fields'));
        });
    }
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

const getUser = (email) => {
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
const checkLogin = async (email, password) => {
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

// Export the database
module.exports = {
    initDatabase,
    createUser,
    getUser,
    checkLogin
};