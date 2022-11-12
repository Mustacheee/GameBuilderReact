import React, { PropsWithChildren, useContext } from 'react';

interface AuthState {
  apiToken: string;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  apiToken: '',
  isAuthenticated: false,
};

const AuthContext = React.createContext(initialState);

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const apiToken = localStorage.getItem('apiToken') || '';
  const initialState: AuthState = { apiToken, isAuthenticated: false };

  return (
    <AuthContext.Provider value={initialState}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContextProvider;
