import React, { useEffect } from 'react';
import { useStorageState } from '@/utils/useStorageState';
import { JwtPayload, jwtDecode } from 'jwt-decode';

const AuthContext = React.createContext<{
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  signUp: (full_name: string, email: string, phone_number: string, password: string) => void;
  token?: string | null;
  isLoading: boolean;
  full_name?: string;
  email?: string;
  phone_number?: string;
  password?: string;
  userId: number;
}>({
  signIn: () => null,
  signOut: () => null,
  signUp: () => null,
  token: null,
  isLoading: false,
  full_name: null,
  email: null,
  phone_number: null,
  password: null,
  userId: 0,
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
  const [userId, setUserId] = React.useState<number>(0);
  const [full_name, setFullName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [phone_number, setPhoneNumber] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

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
    getUser(token);
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const url = process.env.EXPO_PUBLIC_AUTH_API_URL + '/login';
      console.log(url);
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
    fetch(process.env.EXPO_PUBLIC_AUTH_API_URL + '/logout', {
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

    const url = process.env.EXPO_PUBLIC_AUTH_API_URL + '/register';
    console.log(url);
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
  
  const getUser = async (token: string) => {
      if (!token) {
        return;
      }

      const url = process.env.EXPO_PUBLIC_AUTH_API_URL + '/users/' + token;
      // Send the token as a parameter in the request
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      // Process the response
      const data = await response.json();

      const user = data.user;
      setUserId(user.id);
      setFullName(user.full_name);
      setEmail(user.email);
      setPhoneNumber(user.phone_number);
      setPassword(user.password);
  }

  const value = {
    signIn: login,
    signOut: logout,
    signUp: register,
    token,
    isLoading,
    full_name,
    email,
    phone_number,
    password,
    userId
  };

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
}

