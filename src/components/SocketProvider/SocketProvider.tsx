import React, { FunctionComponent, ReactNode, useEffect, useMemo } from 'react';
import { SocketContext } from '../../utils/contexts';
import { Socket } from 'phoenix';

type SocketCallback = () => string;

type SocketProviderProps = {
  children?: ReactNode;
  onClose?: SocketCallback;
  onConnect?: SocketCallback;
  onError?: SocketCallback;
  onMessage?: SocketCallback;
  options?: any;
  wsUrl: string;
};

const SocketProvider: FunctionComponent<SocketProviderProps> = ({
  children,
  options = {},
  wsUrl,
  onConnect,
}) => {
  const socket = useMemo(
    () => {
      const socket = new Socket(wsUrl, { params: options });

      if (onConnect) {
        socket.onOpen = onConnect;
      }

      socket.onClose = (payload: any) => {
        // console.log('closing socket connection', wsUrl, payload);
        return 'close';
      }

      socket.onError = (payload: any) => {
        // console.log('error with socket connection', wsUrl, payload);
        return 'error';
      }

      socket.onMessage = (payload: any) => {
        // console.log('message for socket connection', wsUrl, payload);
        return 'message';
      }

      return socket;
    },
    [options, wsUrl, onConnect]
  );

  useEffect(() => {
    socket.connect();
  }, [socket, onConnect]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
