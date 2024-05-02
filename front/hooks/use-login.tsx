// A hook that contains the login logic.
// The hook uses the Axios library to send a POST request to the server.
// The POST request is sent to the /login endpoint.
// The request contains the user's email and password.
// The hook is used to log the user into the application.

import axios from 'axios';

export const useLogin = (email: string, password: string) => {

    const login = async () => {
        const apiURL = process.env.API_URL;
        try {
            await axios.post(`${apiURL}/login`, {
                email,
                password,
            },
            {
                headers: {
                    'Content-Type': 'x-www-form-urlencoded',
                },
            });
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return {
        login,
    };
};