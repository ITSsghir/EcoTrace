
// Import the required modules
const { createConnection } = require('mysql');
const bcrypt = require('bcrypt');

const { checkInputs } = require('./utils.js');
const { resolve } = require('path');

// Number of salt rounds for bcrypt
const saltRounds = 10;

// Database on port 3306 localhost, user root, password root
let db;
const connectToDatabase = async () => {
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
        daily_unit VARCHAR(255) NOT NULL,
        monthly FLOAT NOT NULL,
        monthly_unit VARCHAR(255) NOT NULL,
        total FLOAT NOT NULL,
        total_unit VARCHAR(255) NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) {
            console.error('Error creating carbon_footprint table:', err.message);
        } else {
            console.log('Created carbon_footprint table');
        }
    });

    // Create schema for user activities (a user must have a type of activity, a description, a carbon footprint (in kg) and a timestamp)
    db.query(`CREATE TABLE IF NOT EXISTS user_activities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        activity_type VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        carbon_footprint FLOAT NOT NULL,
        unit VARCHAR(255) NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) {
            console.error('Error creating user_activities table:', err.message);
        } else {
            console.log('Created user_activities table');
        }
    });

    // Create schema for user goals (a user must have a goal, a description, a timestamp and a status)
    db.query(`CREATE TABLE IF NOT EXISTS user_goals (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        goal VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(255) NOT NULL
    )`, (err) => {
        if (err) {
            console.error('Error creating user_goals table:', err.message);
        }
        else {
            console.log('Created user_goals table');
        }
    });

    // Create schema for user achievements (a user must have an achievement, a description, a timestamp and a status)
    db.query(`CREATE TABLE IF NOT EXISTS user_achievements (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        achievement VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(255) NOT NULL
    )`, (err) => {
        if (err) {
            console.error('Error creating user_achievements table:', err.message);
        } else {
            console.log('Created user_achievements table');
        }
    });

    // Create schema for user rewards (a user must have a reward, a description, a timestamp and a status)
    db.query(`CREATE TABLE IF NOT EXISTS user_rewards (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        reward VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(255) NOT NULL
    )`, (err) => {
        if (err) {
            console.error('Error creating user_rewards table:', err.message);
        } else {
            console.log('Created user_rewards table');
        }
    });

    // Create schema for user alerts (a user must have an alert, a description, a timestamp and a status)
    db.query(`CREATE TABLE IF NOT EXISTS user_alerts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        alert VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(255) NOT NULL
    )`, (err) => {
        if (err) {
            console.error('Error creating user_alerts table:', err.message);
        } else {
            console.log('Created user_alerts table');
        }
    });
}

function initDatabase() {
    return new Promise((resolve, reject) => {
        connectToDatabase()
            .then((connection) => {
                db = connection;
                setupTables(db);
                resolve();
            })
            .catch((err) => {
                console.error('Error connecting to database:', err.message);
                reject(err);
            });
    });
}


// functions to create a user and get a user
async function createUser(full_name, email, phone_number, password) {

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

async function getUser(email) {
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
async function checkLogin(email, password) {
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
                // Create entry in carbon_footprint table, if it doesn't exist
                db.query(`SELECT * FROM carbon_footprint WHERE user_id = ${user.id}`, (err, result) => {
                    if (err) {
                        console.error('Error querying database:', err.message);
                        reject(err);
                    }
                    if (result.length === 0) {
                        db.query('INSERT INTO carbon_footprint (user_id, daily, daily_unit, monthly, monthly_unit, total, total_unit) VALUES (?, ?, ?, ?, ?, ?, ?)', [user.id, 0, 'kg CO2e', 0, 'kg CO2e', 0, 'kg CO2e'], (err) => {
                            if (err) {
                                console.error('Error inserting carbon footprint into database:', err.message);
                                reject(err);
                            }
                        });
                    }
                });
                resolve(user);
            } else {
                reject(new Error('Incorrect password'));
            }
        });
    });
}

// Get user by id
async function getUserById(id) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
            if (err) {
                console.error('Error querying database:', err.message);
                reject(err);
            }
            if (result.length === 0) {
                resolve(null);
            }
            resolve(result[0]);
        });
    });
}

// Modify user info
async function updateUserInfo(id, user) {
    // Check if the user exists
    const existingUser = await getUserById(id);
    if (!existingUser) {
        return new Promise((resolve, reject) => {
            reject(new Error('User not found'));
        });
    }
    // Check the inputs
    await checkInputs(user.full_name, user.email, user.phone_number, user.password);
    // Hash the password
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    return new Promise((resolve, reject) => {
        db.query('UPDATE users SET full_name = ?, email = ?, phone_number = ?, password = ? WHERE id = ?', [user.full_name, user.email, user.phone_number, hashedPassword, id], (err) => {
            if (err) {
                console.error('Error updating user:', err.message);
                reject(err);
            }
            resolve();
        });
    });
}

// Delete user by id
async function deleteUser(id) {
    const user = await getUserById(id);
    if (!user) {
        return new Promise((resolve, reject) => {
            reject(new Error('User not found'));
        });
    }
    const query = 'DELETE FROM users WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.query(query, [id], (err) => {
            if (err) {
                console.error('Error deleting user:', err.message);
                reject(err);
            }
            db.query('DELETE FROM carbon_footprint WHERE user_id = ?', [id], (err) => {
                if (err) {
                    console.error('Error deleting carbon footprint:', err.message);
                    reject(err);
                }
                db.query('DELETE FROM user_activities WHERE user_id = ?', [id], (err) => {
                    if (err) {
                        console.error('Error deleting user activities:', err.message);
                        reject(err);
                    }
                    resolve();
                });
            });
        });
    });

}


async function getCarbonFootprintAll(id) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT daily, daily_unit, monthly, monthly_unit, total, total_unit FROM carbon_footprint WHERE user_id = ${id}`, (err, result) => {
            if (err) {
                console.error('Error querying database:', err.message);
                reject(err);
            }
            console.log('Result from getCarbonFootprintAll:', result); // Add this line for logging
            if (result.length === 0) {
                resolve(null);
            }
            resolve(result[result.length - 1]);
        });
    });
}

// Update the carbon footprint of the user by id
const updateCarbonFootprint = (userId) => {
    calculateCarbonFootprint(userId, (footprint) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO carbon_footprint (user_id, daily, daily_unit, monthly, monthly_unit, total, total_unit, timestamp)
                        VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
                        ON DUPLICATE KEY UPDATE
                        daily = VALUES(daily),
                        monthly = VALUES(monthly),
                        total = VALUES(total),
                        daily_unit = VALUES(daily_unit),
                        monthly_unit = VALUES(monthly_unit),
                        total_unit = VALUES(total_unit),
                        timestamp = VALUES(timestamp)`;
            db.query(query, [userId, footprint.daily, footprint.daily_unit, footprint.monthly, footprint.monthly_unit, footprint.total, footprint.total_unit], (err) => {
                if (err) {
                    console.error('Error updating carbon footprint:', err.message);
                    reject(err);

                } else {
                    console.log('Updated carbon footprint');
                    resolve();
                }
            });
        });
    });
};


// Calculate the carbon footprint of the user by id
const calculateCarbonFootprint = (userId, callback) => {
    const dailyQuery = `SELECT SUM(carbon_footprint) AS daily
                        FROM user_activities
                        WHERE user_id = ? AND DATE(timestamp) = CURDATE()`;

    const monthlyQuery = `SELECT SUM(carbon_footprint) AS monthly
                          FROM user_activities
                          WHERE user_id = ? AND MONTH(timestamp) = MONTH(CURDATE()) AND YEAR(timestamp) = YEAR(CURDATE())`;

    const totalQuery = `SELECT SUM(carbon_footprint) AS total
                        FROM user_activities
                        WHERE user_id = ?`;

    const unitQuery = `SELECT unit FROM user_activities WHERE user_id = ? LIMIT 1`;
    return new Promise((resolve, reject) => {
        db.query(unitQuery, [userId], (err, unitResult) => {
            if (err) {
                console.error('Error fetching unit:', err.message);
                reject(err);
            }
            const unit = unitResult[0]?.unit || 'kg CO2e';
            db.query(dailyQuery, [userId], (err, dailyResult) => {
                if (err) {
                    console.error('Error calculating daily footprint:', err.message);
                    reject(err);
                }
                db.query(monthlyQuery, [userId], (err, monthlyResult) => {
                    if (err) {
                        console.error('Error calculating monthly footprint:', err.message);
                        reject(err);
                    }
                    db.query(totalQuery, [userId], (err, totalResult) => {
                        if (err) {
                            console.error('Error calculating total footprint:', err.message);
                            reject(err);
                        }
                        callback({
                            daily: dailyResult[0].daily || 0,
                            daily_unit: unit,
                            monthly: monthlyResult[0].monthly || 0,
                            monthly_unit: unit,
                            total: totalResult[0].total || 0,
                            total_unit: unit
                        });

                        resolve();
                    });
                });
            });
        });
    });
};


// Insert an activity for the user
const insertActivity = (userId, name, activityType, description, carbonFootprint, unit) => {
    const query = `INSERT INTO user_activities (user_id, name, activity_type, description, carbon_footprint, unit, timestamp)
                   VALUES (?, ?, ?, ?, ?, ?, NOW())`;
    return new Promise((resolve, reject) => {
        db.query(query, [userId, name, activityType, description, carbonFootprint, unit], (err) => {
            if (err) {
                console.error('Error inserting activity:', err.message);
                reject(err);
            } else {
                console.log('Inserted activity');
                updateCarbonFootprint(userId);
                resolve();
            }
        });
    });
};

// Get all activities for the user
const getActivities = (userId) => {
    const query = `SELECT * FROM user_activities WHERE user_id = ?`;
    return new Promise((resolve, reject) => {
        db.query(query, [userId], (err, result) => {
            if (err) {
                console.error('Error fetching activities:', err.message);
                reject(err);
            }
            resolve(result);
        });
    });
}


// Export the functions
module.exports = {
    initDatabase,
    getUser,
    getCarbonFootprintAll,
    createUser,
    checkLogin,
    updateUserInfo,
    deleteUser,
    insertActivity,
    getActivities
};