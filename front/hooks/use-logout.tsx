// A hook that contains the logout logic.
// The hook uses the Axios library to send a GET request to the server.
// The GET request is sent to the /logout endpoint.
// The request logs the user out of the application.
// The hook is used to log the user out of the application.

import axios from 'axios';
import { useEffect } from 'react';


export const useLogout = () => {
    const logout = async () => {
        const apiURL = process.env.API_URL;
        try {
            await axios.get(`${apiURL}/logout`);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    useEffect(() => {
        logout();
    }, []);

    return {
        logout,
    };
};