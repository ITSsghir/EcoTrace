// A hook that contains the logout logic.

import axios from 'axios';
import { useEffect } from 'react';


export const useLogout = () => {
    const logout = async () => {
        try {
            await axios.get('http://localhost:3000/logout', {});
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