import React, { FunctionComponent, ReactNode } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store/reducer';
import { AUTHENTICATED_SOCKET } from '../../utils/helpers/sockethelpers';
import ChannelProvider from '../ChannelProvider/ChannelProvider';
import SocketProvider from './SocketProvider';

type SocketProviderProps = {
  apiToken: string;
  children?: ReactNode;
  options?: any;
};

const AuthenticatedSocketProvider: FunctionComponent<SocketProviderProps> = ({
  apiToken,
  children,
  options = {},
}) => {
  return (
    <SocketProvider
      wsUrl={AUTHENTICATED_SOCKET}
      options={{ ...options, apiToken }}
    >
      <ChannelProvider>{children}</ChannelProvider>
    </SocketProvider>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    apiToken: state.auth.apiToken || '',
  };
};

export default connect(mapStateToProps)(AuthenticatedSocketProvider);
