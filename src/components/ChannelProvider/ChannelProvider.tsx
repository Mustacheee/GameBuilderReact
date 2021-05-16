import React, {
  FunctionComponent,
  ReactNode,
  useContext,
  useEffect,
} from 'react';
import { SocketContext } from '../../utils/contexts';
import { RootState } from '../../store/reducer';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { User } from '../../types';
import { userUpdate } from '../../store/actions/user';

type SocketCallback = () => string;

type ChannelProviderProps = {
  children?: ReactNode;
  onClose?: SocketCallback;
  onConnect?: SocketCallback;
  onError?: SocketCallback;
  onMessage?: SocketCallback;
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
  console.log('sup', channelName)

  useEffect(() => {
    const channel = socket.channel(channelName);
    channel.onMessage = (event: string, payload) => {
      // console.log('user message received', event, payload);
      const user = payload?.response?.user;

      switch (event) {
        case 'phx_reply':
          updateUser(user);
          break;
        default:
      }

      return payload;
    };

    channel
      .join()
      .receive('error', (reason) => console.log('failed join', reason))
      .receive('timeout', (err = '') =>
        console.log('Networking issue. Still waiting...', err)
      );

    return () => {
      channel.leave();
    };
  }, [channelName, socket, updateUser]);

  return <>{children}</>;
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
