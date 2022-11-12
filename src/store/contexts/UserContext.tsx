import React, { PropsWithChildren, useContext, useState } from 'react';
import { IUser } from '../../types';

interface UserState {
  user: IUser | null;
  setUser: (data: IUser) => void;
}

const UserContext = React.createContext({} as UserState);

const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<IUser | null>(null);
  const initialState = { user, setUser };

  return (
    <UserContext.Provider value={initialState}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserContextProvider;
