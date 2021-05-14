import React, { FunctionComponent, ReactNode, useEffect, useMemo } from 'react';
import { SocketContext } from '../../utils/contexts';
import { Socket } from 'phoenix';

type SocketProviderProps = {
  children?: ReactNode;
  options?: any;
  wsUrl: string;
};

const SocketProvider: FunctionComponent<SocketProviderProps> = ({
  children,
  options = {},
  wsUrl,
}) => {
  console.log(wsUrl)
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
