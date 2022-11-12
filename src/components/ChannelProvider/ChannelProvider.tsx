import React, {
  FunctionComponent,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ChannelContext, SocketContext } from '../../utils/contexts';
import { IUser } from '../../types';
import { createFromPhoenixChannel, EMPTY_CHANNEL } from '../../utils/channel';

type ChannelProviderProps = {
  children?: ReactNode;
  options?: any;
  userId: string;
  setUser: (user: IUser) => void;
};

const ChannelProvider: FunctionComponent<ChannelProviderProps> = ({
  children,
  userId,
  setUser,
}) => {
  const socket = useContext(SocketContext);
  const channelName = `user:${userId}`;
  const [userChannel, setUserChannel] = useState(EMPTY_CHANNEL);

  useEffect(() => {
    const channel = socket.channel(channelName);

    channel.onMessage = (event: string, payload) => {
      console.log('user message received', event, payload);
      const user = payload?.response?.user;
      const games = payload?.response?.games || [];
      const payloadEvent = payload?.response?.event  || event;

      switch (payloadEvent) {
        case 'user_join':
          setUser({...user, games});
          break;
        default:
      }

      return payload;
    };

    channel.join();
    // .receive('error', (reason) => console.log('failed join', reason))
    // .receive('timeout', (err = '') =>
    //   console.log('Networking issue. Still waiting...', err)
    // );

    setUserChannel(createFromPhoenixChannel(channel));

    return () => {
      channel.leave();
    };
  }, [channelName, socket, setUser]);

  return (
    <ChannelContext.Provider value={userChannel}>
      {children}
    </ChannelContext.Provider>
  );
};

export default ChannelProvider;
