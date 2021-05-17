import { Dispatch, Reducer, useContext, useEffect, useReducer, useState } from 'react';
import { ChannelAction } from '../../types';
import Channel, { createFromPhoenixChannel, EMPTY_CHANNEL } from '../channel';
import { SocketContext } from '../contexts';

const useChannel = <T extends unknown>(
  channelName: string,
  reducer: Reducer<T, ChannelAction>,
  initialState: T
): [T, Channel] => {
  const socket = useContext(SocketContext);
  const [state, dispatch]: [any, Dispatch<ChannelAction>] = useReducer(
    reducer,
    initialState,
  );
  const [channel, setChannel] = useState(EMPTY_CHANNEL);

  useEffect(() => {
    const channel = socket.channel(channelName);
    channel.onMessage = (event, payload) => {
      dispatch({ type: payload?.response?.event || event, payload });
      return payload;
    };

    channel.join();

    setChannel(createFromPhoenixChannel(channel))

    return () => {
      channel.leave();
    };
  }, [channelName, socket]);

  return [state, channel];
};

export default useChannel;
