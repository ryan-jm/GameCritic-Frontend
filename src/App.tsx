import './styles/globals.scss';
import '@elastic/eui/dist/eui_theme_dark.css';

import { EuiProvider } from '@elastic/eui';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import { AuthProvider, RequireAuth } from './contexts/Auth/AuthContext';
import Categories from './pages/Categories/Categories';
import Dashboard from './pages/Dashboard/Dashboard';
import Error from './pages/Error/Error';
import Home from './pages/Home/Home';
import IndividualReview from './pages/IndividualReview/IndividualReview';
import Login from './pages/Login/Login';
import Reviews from './pages/Reviews/Reviews';

function App() {
  return (
    <div className="App">
      <EuiProvider colorMode="dark">
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Error />} />
            <Route path="/reviews">
              <Route
                index
                element={
                  <RequireAuth>
                    <Reviews />
                  </RequireAuth>
                }
              />
              <Route
                path=":review_id"
                element={
                  <RequireAuth>
                    <IndividualReview />
                  </RequireAuth>
                }
              />
            </Route>
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/categories"
              element={
                <RequireAuth>
                  <Categories />
                </RequireAuth>
              }
            />
          </Routes>
        </AuthProvider>
      </EuiProvider>
    </div>
  );
}

export default App;
