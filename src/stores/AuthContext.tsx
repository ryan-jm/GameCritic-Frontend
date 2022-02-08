import axios, { AxiosInstance } from 'axios';
import { createContext, FC, useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface IUser {
  username: string;
  name: string;
  avatar_url: string;
}

interface IAuthContext {
  isAuthed: boolean;
  user?: IUser | null;
  token?: string;
  login: (username: string, password: string) => Promise<AxiosInstance>;
  logout: (username: string) => Promise<void> | void;
}

const defaultClient = axios.create({
  baseURL: 'https://gamecritic.herokuapp.com/api/',
});

const defaultState = {
  isAuthed: false,
  login: async () => defaultClient,
  logout: async () => {},
};

const AuthContext = createContext<IAuthContext>(defaultState);

export const AuthProvider: FC = ({ children }) => {
  const [isAuthed, setAuthStatus] = useState(defaultState.isAuthed);
  const [token, setToken] = useState('');
  const [user, setUser] = useState<IUser | null>(null);

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
      const {
        data: { user },
      } = await newClient.get(`users/${username}`);
      if (user) {
        setUser(user);
        setToken(token);
        setAuthStatus(true);
        return newClient;
      }
    }

    return axios.create({
      baseURL: 'https://gamecritic.herokuapp.com/api/',
    });
  };

  const logout = (username: string) => {
    setAuthStatus(false);
    setToken('');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthed, token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const RequireAuth = ({ children }: any) => {
  const location = useLocation();
  const { isAuthed } = useAuth();

  return isAuthed ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
