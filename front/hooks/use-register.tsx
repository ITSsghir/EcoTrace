// A Typescript file that contains the signup hook.
// The hook is used to register a new user.
// The hook uses the Axios library to send a POST request to the server.
// The POST request is sent to the /register endpoint.
// The request contains the user's full name, email, phone number, and password.

import axios from 'axios';

// A hook that contains the signup logic.
export const useRegister = (fullName: string, email: string, phoneNumber: string, password: string) => {

    const register = async () => {
        const apiURL = process.env.API_URL;
        try {
            await axios.post(`${apiURL}/register`, {
                fullName,
                email,
                phoneNumber,
                password,
            }, {
                headers: {
                    'Content-Type': 'x-www-form-urlencoded',
                },
            });
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return {
        register,
    };
};