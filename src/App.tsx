import './styles/globals.scss';
import '@elastic/eui/dist/eui_theme_dark.css';

import { EuiProvider } from '@elastic/eui';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Error from './pages/Error';
import Home from './pages/Home';
import Login from './pages/Login';
import Reviews from './pages/Reviews';

function App() {
  return (
    <EuiProvider colorMode="dark">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
        <Route path="/reviews">
          <Route index element={<Reviews />} />
        </Route>
      </Routes>
    </EuiProvider>
  );
}

export default App;
