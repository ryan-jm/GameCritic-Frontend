import axios, { AxiosInstance } from 'axios';
import { createContext, FC, useContext, useEffect, useState } from 'react';

interface IUser {
  username: string;
  name: string;
  avatar_url: string;
}

interface IAuthContext {
  isAuthed: boolean;
  user?: IUser | null;
  token?: string;
  login: (username: string, password: string) => Promise<void>;
  logout: (username: string) => Promise<void> | void;
  client?: AxiosInstance | null;
}

const defaultState = {
  isAuthed: false,
  login: async () => {},
  logout: async () => {},
};

const AuthContext = createContext<IAuthContext>(defaultState);

export const AuthProvider: FC = ({ children }) => {
  const [isAuthed, setAuthStatus] = useState(defaultState.isAuthed);
  const [token, setToken] = useState('');
  const [user, setUser] = useState<IUser | null>(null);
  const [client, setClient] = useState<AxiosInstance | null>(null);

  useEffect(() => {
    if (!client) {
      const newClient = axios.create();
      setClient(newClient);
    }
  }, []);

  const login = async (username: string, password: string) => {
    const {
      data: { token },
    } = await axios.post('https://gamecritic.herokuapp.com/api/auth', {
      username,
      password,
    });
    if (token) {
      const newClient = axios.create({
        baseURL: 'https://gamecritic.herokuapp.com/api/',
        headers: { token: token },
      });
      setClient(newClient);
      const {
        data: { user },
      } = await newClient.get(`users/${username}`);
      if (user) {
        setUser(user);
        setToken(token);
        setAuthStatus(true);
      }
    }
  };

  const logout = (username: string) => {
    setAuthStatus(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthed, token, user, login, logout, client }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
