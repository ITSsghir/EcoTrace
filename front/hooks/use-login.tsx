// A hook that contains the login logic.

import { useState } from 'react';

import axios from 'axios';

export const useLogin = (email: string, password: string) => {

    const login = async () => {
        try {
            await axios.post('http://localhost:3000/login', {
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