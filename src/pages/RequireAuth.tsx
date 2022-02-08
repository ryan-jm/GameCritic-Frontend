import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../stores/AuthContext';

const RequireAuth = ({ children }: any) => {
  const { isAuthed } = useAuth();

  return isAuthed ? children : <Navigate to="/login" replace />;
};

export default RequireAuth;
