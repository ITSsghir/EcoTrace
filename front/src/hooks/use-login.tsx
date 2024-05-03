// A hook that contains the login logic.
// We'll use this hook to log the user in.

import axios from 'axios';
import { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useSession } from '@/app/context/ctx';

// A hook that contains the login logic.
export const useLogin = async (email: string, password: string) => {
    try {
        const JWT_KEY = 'secretkey';
        const { token } = useSession();

        const url = 'http://100.114.128.64:3000/login';
        // ping the server
        
        const response = await axios.post(url, {
            email: email,
            password: password
        }, {
            headers: {
                'Content-Type': 'x-www-form-urlencoded'
            }
        });

        setToken(response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await SecureStore.setItemAsync(JWT_KEY, token);
        return response;
    } catch (error: any) {
        return { error: true, msg: error.response.data.msg };
    }
}