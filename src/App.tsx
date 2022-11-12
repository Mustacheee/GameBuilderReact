import Dashboard from './views/Dashboard';
import Login from './views/Login';
import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import {
  DASHBOARD,
  LOGIN,
  GAME_CREATE,
  GAME_VIEW,
  CATEGORY_VIEW,
} from './utils/routes';
import CreateGame from './views/CreateGame';
import ViewGame from './views/ViewGame';
import { AuthenticatedSocketProvider } from './components/SocketProvider';
import UnauthenticatedSocketProvider from './components/SocketProvider/UnauthenticatedSocketProvider';
import { CircularProgress } from '@material-ui/core';
import ViewCategory from './views/ViewCategory';
import Header from './components/Header';
import { login } from './utils/api';
import UserContextProvider from './store/contexts/UserContext';

const App = () => {
  const [menuItems, setMenuItems] = useState<Element | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize the application
  useEffect(() => {
    const appStart = async () => {
      const apiToken = localStorage.getItem('apiToken');
      // Check to see if we have an existing apiToken
      if (apiToken) {
        // Attempt to login using apiToken
        const { userData } = await login({ apiToken });

        if (userData) {
          // setUserData(userData);
          setIsAuthenticated(true);
        }
      }

      setIsInitialized(true);
    };

    appStart();
  }, []);

  // Get the socket provider based on authentication status
  const SocketComponent = isAuthenticated
    ? AuthenticatedSocketProvider
    : UnauthenticatedSocketProvider;

  if (!isInitialized) {
    return <CircularProgress />;
  }

  const headerTitle = isAuthenticated ? 'Welcome back!' : 'Welcome!';

  return (
    <UserContextProvider>
      <BrowserRouter>
        <SocketComponent>
          <Header title={headerTitle} menuItems={menuItems} />

          {isInitialized &&
            (isAuthenticated
              ? getAuthenticatedRoutes()
              : getUnauthenticatedRoutes())}
        </SocketComponent>
      </BrowserRouter>
    </UserContextProvider>
  );
};

const getUnauthenticatedRoutes = () => {
  return (
    <Routes>
      <Route path={LOGIN} element={<Login />} />

      <Route element={<Navigate to={LOGIN} />} />
    </Routes>
  );
};

const getAuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route path={DASHBOARD} element={<Dashboard />} />

      <Route path={GAME_CREATE} element={<CreateGame />} />

      <Route path={CATEGORY_VIEW} element={<ViewCategory />} />

      <Route path={GAME_VIEW} element={<ViewGame />} />

      <Route element={<Navigate to={DASHBOARD} />} />
    </Routes>
  );
};

export default App;
