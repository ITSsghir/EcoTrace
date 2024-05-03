// A Typescript file that contains the signup hook.
// The hook is used to register a new user.
// The hook uses the Axios library to send a POST request to the server.
// The POST request is sent to the /register endpoint.
// The request contains the user's full name, email, phone number, and password.

import axios from 'axios';

// A hook that contains the signup logic.
export const useRegister = async (fullName: string, email: string, phoneNumber: string, password: string) => {
    try {
        const url = 'http://100.114.128.64:3000/register';
        // ping the server
        const response = await axios.post(url, {
            full_name: fullName,
            email: email,
            phone_number: phoneNumber,
            password: password
        }, {
            headers: {
                'Content-Type': 'x-www-form-urlencoded'
            }
        });
        return response;
    }
    catch (error: any) {
        return { error: true, msg: error.response.data.msg };
    }
};