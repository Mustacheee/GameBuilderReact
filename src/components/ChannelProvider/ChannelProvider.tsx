import React, {
  FunctionComponent,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ChannelContext, SocketContext } from '../../utils/contexts';
import { RootState } from '../../store/reducer';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IUser } from '../../types';
import { userUpdate } from '../../store/actions/user';
import { createFromPhoenixChannel, EMPTY_CHANNEL } from '../../utils/channel';

type ChannelProviderProps = {
  children?: ReactNode;
  options?: any;
  userId: string;
  updateUser: (user: IUser) => void;
};

const ChannelProvider: FunctionComponent<ChannelProviderProps> = ({
  children,
  userId,
  updateUser,
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
          updateUser({...user, games});
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
  }, [channelName, socket, updateUser]);

  return (
    <ChannelContext.Provider value={userChannel}>
      {children}
    </ChannelContext.Provider>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    userId: state.user.id,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateUser: (user: IUser) => dispatch(userUpdate(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelProvider);
