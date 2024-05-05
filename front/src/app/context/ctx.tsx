import React, { useEffect } from 'react';
import { useStorageState } from '@/utils/useStorageState';
import { JwtPayload, jwtDecode } from 'jwt-decode';

const API_URL =  'https://100.114.128.64:3000'

const AuthContext = React.createContext<{
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  signUp: (full_name: string, email: string, phone_number: string, password: string) => void;
  predict: (image: string) => void;
  prediction: string,
  token?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  signUp: () => null,
  predict: () => null,
  prediction: '',
  token: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, token], setToken] = useStorageState('token');
  const [prediction, setPrediction] = React.useState<string>('');

  // Set a timer to log out the user after the token expires
  useEffect(() => {
    if (token) {
      let decodedToken = jwtDecode<JwtPayload>(token);
      console.log("Decoded Token", decodedToken);
      let currentDate = new Date();

      // JWT exp is in seconds
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        console.log("Token expired.");
        setToken(null);
      } else {
        console.log("Valid token");
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const url = 'http://100.114.128.64:3000/login';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    
      const data = await response.json();
      const token = data.token;
      console.log(data.message);
      console.log('Token set:', token); // Log token here
      setToken(token)
      console.log('Token set:', token); // Log token here
    } catch (error) {
      console.error('Error during login:', error);
      // Handle error, show an error message, etc.
    }
  };
  
  const logout = () => {
    // GET request to the API to the endpoint /logout
    fetch('http://100.114.128.64:3000/logout', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    setToken(null);

    // Later we will remove the token from the request headers
    // axios.defaults.headers.common['Authorization'] = '';
  }

  const register = async (full_name: string, email: string, phone_number: string, password: string) => {
    // POST request to the API to the endpoint /register
    const url = 'http://100.114.128.64:3000/register';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        full_name: full_name,
        email: email,
        phone_number: phone_number,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log(response);
    const data = await response.json();
    console.log(data.message);
    const token = data.token;
    setToken(token);

    // Later we will add the token to the request headers
    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    console.log('Token set:', token); // Log token here
  }

  const predict = async (image: string) => {
    const url = API_URL + '/predict';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        uri: image,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data);
    setPrediction(data.prediction);
    console.log(prediction);
  }

  const value = {
    signIn: login,
    signOut: logout,
    signUp: register,
    predict: predict,
    prediction,
    token,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
}
function jwt_decode(token: string) {
  throw new Error('Function not implemented.');
}

