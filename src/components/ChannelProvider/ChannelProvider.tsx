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
import { User } from '../../types';
import { userUpdate } from '../../store/actions/user';
import { createFromPhoenixChannel, EMPTY_CHANNEL } from '../../utils/channel';

type ChannelProviderProps = {
  children?: ReactNode;
  options?: any;
  userId: string;
  updateUser: (user: User) => void;
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

      switch (event) {
        case 'phx_reply':
          updateUser(user);
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
    updateUser: (user: User) => dispatch(userUpdate(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelProvider);
