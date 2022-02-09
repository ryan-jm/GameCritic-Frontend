import { createContext, FC, useContext, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import * as Auth from '../api/Auth';
import { IAuthContext, IUser } from '../types/auth.types';

const defaultState = {
  isAuthed: false,
  login: async () => {},
  logout: async () => {},
};

const AuthContext = createContext<IAuthContext>(defaultState);

export const AuthProvider: FC = ({ children }) => {
  const [isAuthed, setAuthStatus] = useState(defaultState.isAuthed);
  const [user, setUser] = useState<IUser | null>(null);

  const login = async (username: string, password: string) => {
    const user = await Auth.validate(username, password);
    if (user) {
      setUser(user);
      setAuthStatus(true);
    }
  };

  const logout = (username: string) => {
    setAuthStatus(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthed, user, login, logout }}>
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
