import axios from 'axios';
import { createContext, FC, useContext, useState } from 'react';

interface IUser {
  username: string;
  name: string;
  avatar_url: string;
}

interface IAuthContext {
  isAuthed: boolean;
  user?: IUser | null;
  token?: string;
  login?: (username: string, password: string) => void;
  logout?: (username: string) => void;
}

const defaultState = {
  isAuthed: false,
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
      const {
        data: { user },
      } = await axios.get(
        `https://gamecritic.herokuapp.com/api/users/${username}`
      );
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
    <AuthContext.Provider value={{ isAuthed, token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
