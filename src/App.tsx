import Dashboard from './views/Dashboard';
import Login from './views/Login';
import React, { FunctionComponent, useEffect } from 'react';
import { RootState } from './store/reducer';
import { connect } from 'react-redux';
import {
  Switch,
  Route,
  BrowserRouter,
  Redirect
} from "react-router-dom";
import { Dispatch } from 'redux';
import { appStart } from './store/actions/app';
import { DASHBOARD, LOGIN, GAME_CREATE, } from './utils/routes';
import CreateGame from './views/CreateGame';

type AppProps = {
  apiToken: string | null;
  initializeApp: (apiToken: string | null, isAuthenticated: boolean) => void;
  isAuthenticated: boolean;
  isInitialized: boolean;
}

const App: FunctionComponent<AppProps> = ({
  apiToken,
  initializeApp,
  isAuthenticated,
  isInitialized,
}) => {

  useEffect(() => {
    const start = async () => {
      initializeApp(apiToken, isAuthenticated);
    }

    start();
  }, [apiToken, initializeApp, isAuthenticated])

  const routes = isAuthenticated
    ? getAuthenticatedRoutes()
    : getUnauthenticatedRoutes();

  return (
    <BrowserRouter>
      <Switch>
        {isInitialized && routes}
      </Switch>
    </BrowserRouter>
  );
}

const getUnauthenticatedRoutes = () => {
  return (<>
    <Route path={LOGIN}>
      <Login />
    </Route>

    <Route>
      <Redirect to={LOGIN} />
    </Route>
  </>);
}

const getAuthenticatedRoutes = () => {
  return (<>
    <Route path={DASHBOARD}>
      <Dashboard />
    </Route>

    <Route path={GAME_CREATE}>
      <CreateGame />
    </Route>

    <Route>
      <Redirect to={DASHBOARD} />
    </Route>
  </>);
}

const mapStateToProps = (state: RootState) => {
  return {
    apiToken: state.auth.apiToken,
    isAuthenticated: state.auth.isAuthenticated,
    isInitialized: state.app.isInitialized,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    initializeApp: () => appStart()(dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
