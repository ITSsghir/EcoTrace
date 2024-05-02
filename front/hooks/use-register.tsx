// A Typescript file that contains the signup hook.

import { useState } from 'react';
import axios from 'axios';

// A hook that contains the signup logic.
export const useRegister = (fullName: string, email: string, phoneNumber: string, password: string) => {

    const register = async () => {
        try {
            await axios.post('http://localhost:3000/register', {
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