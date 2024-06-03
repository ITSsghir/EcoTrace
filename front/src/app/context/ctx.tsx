import React, { useEffect } from 'react';
import { useStorageState } from '@/hooks/useStorageState';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import * as FileSystem from 'expo-file-system';

const AuthContext = React.createContext<{
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  signUp: (full_name: string, email: string, phone_number: string, password: string) => void;
  getPredictionVertexAI: (uri: string) => void;
  getPredictionVertexAIText: (text: string) => void;
  createActivity: (activity: any) => void;
  updateUser: (user: any) => void;
  deleteUser: (id: number) => void;
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
  predictionJson?: string;
  history?: string;
  lastLogin?: string;
}>({
  signIn: () => null,
  signOut: () => null,
  signUp: () => null,
  getPredictionVertexAI: () => null,
  getPredictionVertexAIText: () => null,
  createActivity: () => null,
  updateUser: () => null,
  deleteUser: () => null,
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
  predictionJson: null,
  history: null,
  lastLogin: null,
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
  const [[isloading, lastLogin], setLastLogin] = useStorageState('lastLogin');
  const [history, setHistory] = React.useState<any>(null);
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
  const [predictionJson, setPredictionJson] = React.useState<any>(null);

  const EXPO_PUBLIC_AUTH_API_URL = "http://34.32.171.160:3000";

  // Set a timer to log out the user after the token expires
  useEffect(() => {
    if (token) {
      let decodedToken = jwtDecode<JwtPayload>(token);
      let currentDate = new Date();

      // JWT exp is in seconds
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        console.log("Token expired.");
        initialize();
      } else {
        const verification = verifyToken(token);
        if (verification) {
          getUser(token);
          getCarbonFootprintInfo(userId);
          getActivities(userId);
          console.log(userId);
        }
        else {
          console.log("Token invalid.");
          initialize();
        }
      }
    }
  }, [token, userId]);

  const login = async (email: string, password: string) => {
    try {
      const url = EXPO_PUBLIC_AUTH_API_URL + '/login';
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
      const lastLogin = new Date().toLocaleString();
      setLastLogin(lastLogin);
    } catch (error) {
      console.error('Error during login:', error);
      // Handle error, show an error message, etc.
    }
  };
  
  const logout = () => {
    // GET request to the API to the endpoint /logout
    fetch(EXPO_PUBLIC_AUTH_API_URL + '/logout', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    
    initialize();
    // Later we will remove the token from the request headers
    // axios.defaults.headers.common['Authorization'] = '';
  }

  const initialize = async () => {
    setToken(null);
    setLastLogin(null);
    setUserId(0);
    setHistory(null);
    setFullName('');
    setEmail('');
    setPhoneNumber('');
    setPassword('');
    setDailyBalance(0);
    setDailyUnit('kgCO2e');
    setMonthlyBalance(0);
    setMonthlyUnit('kgCO2e');
    setBalance(0);
    setUnit('kgCO2e');
    setPredictionJson(null);
  }

  const register = async (full_name: string, email: string, phone_number: string, password: string) => {
    // POST request to the API to the endpoint /register

    const url = EXPO_PUBLIC_AUTH_API_URL + '/register';
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
    const lastLogin = new Date().toLocaleString();
    setLastLogin(lastLogin);

    // Later we will add the token to the request headers
    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    console.log('Token set:', token); // Log token here
  }
  
  const getUser = async (token: string) => {
      if (!token) {
        return;
      }

      const url = EXPO_PUBLIC_AUTH_API_URL + '/users/' + token;
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

      getActivities(user.id);
      console.log('History: ' + history);
  }

  const getCarbonFootprintInfo = async (id: number) => {
    const url = EXPO_PUBLIC_AUTH_API_URL + '/users/' + id + '/carbon_footprint';
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

    // Updated getActivities function
    const getActivities = async (id: number) => {
      try {
        const url = `${EXPO_PUBLIC_AUTH_API_URL}/users/${id}/activities`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
  
        // Ensure that the response contains the history data
        if (data.history) {
          setHistory(JSON.stringify(data.history));
          console.log('History set:', data.history);
        } else {
          console.error('No history found in the response');
        }
  
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

  // Get the predictions from the server (Vertex Vision AI API)
  const getPredictionVertexAI = async (uri : string) => {      
    console.log("Getting predictions");

    if (!uri) {
      return;
    }
    try {
      const fileExtension = uri.split('.').pop();

      // convert image to base64
      const base64ImageData = await FileSystem.readAsStringAsync(uri, { 
        encoding: FileSystem.EncodingType.Base64 
      });

      // Prompt for the model (for more information on the prompt, check the Vertex AI API documentation https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/design-multimodal-prompts?hl=fr)
      const prompt = "Fournissez la liste de tous les attributs suivants :\n"
        + "Nom du plat, ingrédients (estimation quantité, unité (en gramme)), l'empreinte carbone totale de la recette, une description de l'activité (J'ai mangé ....) et l'unité, au format JSON\n"
        + "Exemple :\n"
        + "{\n"
        + "  \"ingredients\": [\n"
        + "    {\n"
        + "      \"nom\": \"tomate\",\n"
        + "      \"quantité\": 100,\n"
        + "      \"unité\": \"g\"\n"
        + "    },\n"
        + "    {\n"
        + "      \"nom\": \"spaghetti\",\n"
        + "      \"quantite\": 200,\n"
        + "      \"unite\": \"g CO2z\"\n"
        + "    }\n"
        + "  ],\n"
        + "  \"nom\": \"plat de pâtes\",\n"
        + "  \"description\": \"J'ai mangé un plat de pâtes avec tomate et spaghetti\",\n"
        + "  \"total_carbon_footprint\": 100,\n"
        + "  \"unite\": \"g CO2e\"\n" // or "kg CO2e"
        + "}";

      const url = `${EXPO_PUBLIC_AUTH_API_URL}/predict-image`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          base64Image: base64ImageData,
          extension: `${fileExtension}`,
          prompt: prompt
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch predictions');
      }

      console.log(response);

      const rawData = await response.json();
      const predictionData = rawData.prediction;
      console.log("rawData: " + rawData);
      // Remove the '/n' characters from the response, and ```json from the beginning and ``` from the end
      const data = predictionData.replace(/\n/g, '').replace('```json', '').replace('```', '');
      // Parse the JSON data
      const dataJSON = JSON.parse(data);
      console.log("Data JSON: " + JSON.stringify(dataJSON));
      setPredictionJson(JSON.stringify(dataJSON));
    } catch (error) {
      console.error("Error fetching predictions:", error);
    }
  }

  const getPredictionVertexAIText = async (text: string) => {
    console.log("Getting predictions");

    if (!text) {
      return;
    }
    try {
      // Prompt for the model (for more information on the prompt, check the Vertex AI API documentation https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/design-multimodal-prompts?hl=fr)
      const prompt = "A partir du JSON suivant:\n"
        + text + "\n"
        + "Fournissez la liste des attributs suivants:\n"
        + "Nom du plat (à partir de l'attribut name dans le JSON), ingrédients (extraite du JSON fourni (ingrédients s'il y a lieu à partir de l'attribut description + quantité)), description (à partir de l'attribut description dans le JSON), date (à partir de l'attribut date dans le JSON), "
        + "l'empreinte carbone totale de la recette, et l'unité, au format JSON, c'est à vous de fournir l'empreinte carbone totale et l'unité\n"
        + "Exemple :\n"
        + "{\n"
        + "  \"nom\": \"plat de pâtes\",\n"
        + "  \"description\": \"plat de pâtes avec tomate et spaghetti\",\n"
        + "  \"date\": \"2022-12-31T23:59:59\",\n"
        + "  \"ingredients\": [\n"
        + "    {\n"
        + "      \"nom\": \"tomate\",\n"
        + "      \"quantité\": 100,\n"
        + "      \"unité\": \"g\"\n"
        + "    },\n"
        + "    {\n"
        + "      \"nom\": \"spaghetti\",\n"
        + "      \"quantite\": 200,\n"
        + "      \"unite\": \"g CO2z\"\n"
        + "    }\n"
        + "  ],\n"
        + "  \"total_carbon_footprint\": 100,\n"
        + "  \"unite\": \"g CO2e\"\n" // or "kg CO2e"
        + "}"
        + "Note: Veuillez remplacer les valeurs par les valeurs réelles (d'une façon logique, répartis les ingrédients et leur quantité d'une façon à s'additionner à la quantité totale du plat) et donner que le JSON demandé, et rien d'autre\n";

      const url = `${EXPO_PUBLIC_AUTH_API_URL}/predict-text`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          text: text,
          prompt: prompt
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch predictions');
      }
      const rawData = await response.json();
      const predictionData = rawData.prediction;
      console.log("rawData: " + rawData);
      // Remove the '/n' characters from the response, and ```json from the beginning and ``` from the end
      const data = predictionData.replace(/\n/g, '').replace('```json', '').replace('```', '');
      // Parse the JSON data
      const dataJSON = JSON.parse(data);
      console.log("Data JSON: " + JSON.stringify(dataJSON));
      setPredictionJson(JSON.stringify(dataJSON));
    } catch (error) {
      console.error("Error fetching predictions:", error);
    }
  }

  const createActivity = async (activity: any) => {
    const url = EXPO_PUBLIC_AUTH_API_URL + '/activities';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: userId,
        name: activity.name,
        activity_type: activity.activity_type,
        description: activity.description,
        carbon_footprint: activity.carbon_footprint,
        unit: activity.unit,
      }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json().catch(error => {
      console.error('Error parsing JSON:', error);
    });
    console.log(data.message);
    getCarbonFootprintInfo(userId);
    getActivities(userId);  
  }

  const updateUser = async (user: any) => {
    // Check the passwords match
    if (user.password !== user.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    const url = EXPO_PUBLIC_AUTH_API_URL + '/users/' + userId;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        full_name: user.full_name,
        email: user.email,
        phone_number: user.phone_number,
        password: user.password,
      }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json().catch(error => {
      console.error('Error parsing JSON:', error);
    });
    console.log(data.message);
    setFullName(user.full_name);
    setEmail(user.email);
    setPhoneNumber(user.phone_number);
    setPassword(user.password);
  }

  // Delete a user
  const deleteUser = async (id: number) => {
    const url = EXPO_PUBLIC_AUTH_API_URL + '/users/' + id;
    const response = await fetch(url, {
      method: 'DELETE',
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
    });
    console.log(data.message);
    logout();
  }

  const verifyToken = async (token: string) => {
    const url = EXPO_PUBLIC_AUTH_API_URL + '/verify';
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
    getCarbonFootprintInfo(userId);
    return true ? data.message === 'Token verified' : false;
  }

  const value = {
    signIn: login,
    signOut: logout,
    signUp: register,
    getPredictionVertexAI,
    getPredictionVertexAIText,
    createActivity,
    updateUser,
    deleteUser,
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
    predictionJson,
    history,
    lastLogin,
  };

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
}

