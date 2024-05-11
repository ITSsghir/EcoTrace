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
  daily_balance?: number;
  daily_unit?: string;
  monthly_balance?: number;
  monthly_unit?: string;
  balance?: number;
  unit?: string;
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
  daily_balance: 0,
  daily_unit: 'kgCO2e',
  monthly_balance: 0,
  monthly_unit: 'kgCO2e',
  balance: 0,
  unit: 'kgCO2e',
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
  const [daily_balance, setDailyBalance] = React.useState<number>(0);
  const [daily_unit, setDailyUnit] = React.useState<string>('kgCO2e');
  const [monthly_balance, setMonthlyBalance] = React.useState<number>(0);
  const [monthly_unit, setMonthlyUnit] = React.useState<string>('kgCO2e');
  const [balance, setBalance] = React.useState<number>(0);
  const [unit, setUnit] = React.useState<string>('kgCO2e');

  // Set a timer to log out the user after the token expires
  useEffect(() => {
    if (token) {
      let decodedToken = jwtDecode<JwtPayload>(token);
      let currentDate = new Date();

      // JWT exp is in seconds
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        console.log("Token expired.");
        setToken(null);
      } else {
        console.log("Valid token");
        const verification = verifyToken(token);
        if (verification) {
          getUser(token);
          getCarbonFootprintInfo(userId);
        }
        else {
          console.log("Token invalid.");
          setToken(null);
        }
      }
    }
  }, [token, userId]);

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
        'Content-Type': 'application/json'
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
      const data = await response.json().catch((error) => {
        console.error('Error:', error);
      });

      const user = data.user;
      setUserId(user.id);
      setFullName(user.full_name);
      setEmail(user.email);
      setPhoneNumber(user.phone_number);
      setPassword(user.password);
  }

  const getCarbonFootprintInfo = async (id: number) => {
    const url = process.env.EXPO_PUBLIC_AUTH_API_URL + '/users/' + id + '/carbon_footprint';
    // Send the token as a parameter in the request
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    // Process the response
    const data = await response.json().catch((error) => {
      console.error('Error:', error);
    });

    const daily_balance = data.daily;
    const daily_unit = data.daily_unit;
    const monthly_balance = data.monthly;
    const monthly_unit = data.monthly_unit;
    const balance = data.total;
    const unit = data.total_unit;
    setDailyBalance(daily_balance);
    setDailyUnit(daily_unit);
    setMonthlyBalance(monthly_balance);
    setMonthlyUnit(monthly_unit);
    setBalance(balance);
    setUnit(unit);
  }

  const verifyToken = async (token: string) => {
    const url = process.env.EXPO_PUBLIC_AUTH_API_URL + '/verify';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json().catch(error => {
      console.error('Error parsing JSON:', error);
      throw error; // Rethrow the error to propagate it
    });
    console.log(data.message);
    return true ? data.message === 'Token verified' : false;
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
    userId,
    daily_balance,
    daily_unit,
    monthly_balance,
    monthly_unit,
    balance,
    unit,
  };

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
}

