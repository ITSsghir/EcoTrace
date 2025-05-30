// Description: This file contains the utility functions that are used in the back-end.

/**
 * 
 * @param {string} email 
 * @returns {Promise<boolean>} if the email is authentic, return true, else return an error
 */
const checkEmailAuthenticity = async (email) => {

    if (!email) {
        return new Promise((resolve, reject) => {
            reject(new Error('Email is required'));
        });
    }
    // Check if the email is really an email
    if (!email.includes('@')) {
        return new Promise((resolve, reject) => {
            reject(new Error('Invalid email'));
        });
    }
    return new Promise((resolve, reject) => {
        resolve(true);
    });
}

/**
 * 
 * @param {string} password 
 * @returns {Promise<boolean>} if the password is authentic, return true, else return an error
 */
const checkPasswordAuthenticity = async (password) => {

    if (!password) {
        return new Promise((resolve, reject) => {
            reject(new Error('Password is required'));
        });
    }
    // Check if the password is at least 8 characters long
    if (password.length < 8) {
        return new Promise((resolve, reject) => {
            reject(new Error('Password must be at least 8 characters long'));
        });
    }
    return new Promise((resolve, reject) => {
        resolve(true);
    });
}

/**
 * 
 * @param {number} phone_number 
 * @returns {Promise<boolean>} if the phone number is authentic, return true, else return an error
 */
const checkPhoneNumberAuthenticity = async (phone_number) => {

    if (!phone_number) {
        return new Promise((resolve, reject) => {
            reject(new Error('Phone number is required'));
        });
    }
    // Check if the phone number is a number
    if (isNaN(phone_number)) {
        return new Promise((resolve, reject) => {
            reject(new Error('Phone number must be a number'));
        });
    }
    if (!(phone_number.length === 10)) {
        return new Promise((resolve, reject) => {
            reject(new Error('Phone number must be 10 digits long'));
        });
    }
    if (phone_number[0] !== '0') {
        return new Promise((resolve, reject) => {
            reject(new Error('Phone number must start with 0'));
        });
    }
    return new Promise((resolve, reject) => {
        resolve(true);
    });
}

/**
 * 
 * @param {string} full_name 
 * @returns {Promise<boolean>} if the full name is authentic, return true, else return an error
 */
async function checkFullNameAuthenticity (full_name) {
    if (!full_name) {
        return new Promise((resolve, reject) => {
            reject(new Error('Full name is required'));
        });
    }

    // Check if the full name is at least 3 characters long
    if (full_name.length < 3) {
        return new Promise((resolve, reject) => {
            reject(new Error('Full name must be at least 3 characters long'));
        });
    }

    return new Promise((resolve, reject) => {
        resolve(true);
    });
}

/**
 * 
 * @param {string} full_name 
 * @param {string} email 
 * @param {number} phone_number 
 * @param {string} password 
 * @returns {Promise<boolean>} if all the inputs are authentic, return true, else return an error
 */
async function checkInputs (full_name, email, phone_number, password) {
    
    // Check if the full name is authentic
    await checkFullNameAuthenticity(full_name);
    
    // Check if the email is authentic
    await checkEmailAuthenticity(email);

    // Check if the phone number is authentic
    await checkPhoneNumberAuthenticity(phone_number);

    // Check if the password is authentic
    await checkPasswordAuthenticity(password);

    return new Promise((resolve, reject) => {
        resolve(true);
    });
}

// Export the functions
module.exports = {
    checkInputs
};