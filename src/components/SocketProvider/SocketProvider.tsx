import React, { FunctionComponent, ReactNode, useEffect } from 'react';
import { SocketContext } from '../../utils/contexts';
import { Socket } from 'phoenix';

type SocketProviderProps = {
  wsUrl: string;
  options: any;
  children?: ReactNode;
};

const SocketProvider: FunctionComponent<SocketProviderProps> = ({
  wsUrl,
  options,
  children,
}) => {
  const socket = new Socket(wsUrl, { params: options });
  useEffect(() => {
    socket.connect();
  }, [options, wsUrl]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
