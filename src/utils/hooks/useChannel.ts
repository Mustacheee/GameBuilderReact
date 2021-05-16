import { Dispatch, Reducer, useContext, useEffect, useReducer } from 'react';
import { ChannelAction } from '../../types';
import { SocketContext } from '../contexts';

const useChannel = <T extends unknown>(
  channelName: string,
  reducer: Reducer<T, ChannelAction>,
  initialState: T
): [T] => {
  const socket = useContext(SocketContext);
  const [state, dispatch]: [any, Dispatch<ChannelAction>] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const channel = socket.channel(channelName);
    channel.onMessage = (event, payload) => {
      dispatch({ type: event, payload });
      return payload;
    };

    channel.join();

    return () => {
      channel.leave();
    };
  }, [channelName, socket]);

  return [state];
};

export default useChannel;
