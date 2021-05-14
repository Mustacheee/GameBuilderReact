import React, { FunctionComponent, ReactNode } from 'react';
import { UNAUTHENTICATED_SOCKET } from '../../utils/helpers/sockethelpers';
import SocketProvider from './SocketProvider';

type UnauthenticatedSocketProps = {
  children?: ReactNode;
  options?: any;
};

const UnauthenticatedSocketProvider: FunctionComponent<UnauthenticatedSocketProps> = ({
  children,
  options = {},
}) => {
  return (
    <SocketProvider wsUrl={UNAUTHENTICATED_SOCKET} options={options}>
      {children}
    </SocketProvider>
  );
};

export default UnauthenticatedSocketProvider;
