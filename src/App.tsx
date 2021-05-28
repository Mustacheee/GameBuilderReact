import Dashboard from './views/Dashboard';
import Login from './views/Login';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { RootState } from './store/reducer';
import { connect } from 'react-redux';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { Dispatch } from 'redux';
import { appStart } from './store/actions/app';
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

type AppProps = {
  initializeApp: () => void;
  isAuthenticated: boolean;
  isInitialized: boolean;
};

type ComponentProps = {
  setHeaderTitle: (title: string) => void;
};

const App: FunctionComponent<AppProps> = ({
  initializeApp,
  isAuthenticated,
  isInitialized,
}) => {
  const [headerTitle, setHeaderTitle] = useState('Welcome!');

  // Initialize the application
  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  const componentProps: ComponentProps = {
    setHeaderTitle,
  };

  const routes = isAuthenticated
    ? getAuthenticatedRoutes(componentProps)
    : getUnauthenticatedRoutes(componentProps);

  // Get the socket provider based on authentication status
  const SocketComponent = isAuthenticated
    ? AuthenticatedSocketProvider
    : UnauthenticatedSocketProvider;

  if (!isInitialized) {
    return <CircularProgress />;
  }

  return (
    <BrowserRouter>
      <SocketComponent>
        <Header title={headerTitle} />

        {isInitialized && routes}
      </SocketComponent>
    </BrowserRouter>
  );
};

const getUnauthenticatedRoutes = (componentProps: ComponentProps) => {
  return (
    <Switch>
      <Route path={LOGIN}>
        <Login />
      </Route>

      <Route>
        <Redirect to={LOGIN} />
      </Route>
    </Switch>
  );
};

const getAuthenticatedRoutes = (componentProps: ComponentProps) => {
  return (
    <Switch>
      <Route path={DASHBOARD}>
        <Dashboard {...componentProps} />
      </Route>

      <Route path={GAME_CREATE}>
        <CreateGame {...componentProps} />
      </Route>

      <Route path={CATEGORY_VIEW}>
        <ViewCategory {...componentProps} />
      </Route>

      <Route path={GAME_VIEW}>
        <ViewGame {...componentProps} />
      </Route>

      <Route>
        <Redirect to={DASHBOARD} />
      </Route>
    </Switch>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isInitialized: state.app.isInitialized,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    initializeApp: () => appStart()(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
