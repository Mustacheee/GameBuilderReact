import { connect } from 'formik';
import React, { FunctionComponent, ReactNode } from 'react';
import { useUserContext } from '../../store/contexts/UserContext';
import { AUTHENTICATED_SOCKET } from '../../utils/helpers/sockethelpers';
import ChannelProvider from '../ChannelProvider/ChannelProvider';
import SocketProvider from './SocketProvider';

type SocketProviderProps = {
  children?: ReactNode;
  options?: any;
};

const AuthenticatedSocketProvider: FunctionComponent<SocketProviderProps> = ({
  children,
  options = {},
}) => {
  // TODO:: Revisit this apiToken stuff
  const apiToken = localStorage.getItem('apiToken') || '';
  const { user, setUser } = useUserContext();

  if (!user) return null;

  return (
    <SocketProvider
      wsUrl={AUTHENTICATED_SOCKET}
      options={{ ...options, apiToken }}
    >
      <ChannelProvider userId={user.id} setUser={setUser}>
        {children}
      </ChannelProvider>
    </SocketProvider>
  );
};

export default AuthenticatedSocketProvider;
