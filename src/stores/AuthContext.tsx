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

  /**
   * It validates the user and if the user is valid, it sets the user and sets the auth status to true.
   * username - The username of the user.
   * password - The password that the user has entered.
   */
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

/**
 * If the user is authenticated, render the children. Otherwise, redirect to the login page
 * children - The children prop is the component that will be rendered if the user is
 * authenticated.
 * returns: A component that will render the children if the user is authenticated, otherwise it will
 * redirect to the login page.
 */
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
