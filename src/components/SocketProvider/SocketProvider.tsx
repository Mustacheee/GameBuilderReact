import React, { FunctionComponent, ReactNode, useEffect, useMemo } from 'react';
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
  const socket = useMemo(
    () => new Socket(wsUrl, { params: options }),
    [options, wsUrl]
  );

  useEffect(() => {
    socket.connect();
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
