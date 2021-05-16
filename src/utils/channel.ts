import { Channel as PhoenixChannel} from 'phoenix';

const EMPTY_CHANNEL: Channel = {
  sendMessage: (_event: string, _payload: object) => {},
};

interface ChannelOptions {
  timeout?: number;
}

const createFromPhoenixChannel = (channel: PhoenixChannel): Channel => {
  return {
    sendMessage: (event: string, payload: object, options?: ChannelOptions) => {
      return channel.push(event, payload, options?.timeout);
    }
  };
}

export interface Channel {
  sendMessage: (event: string, payload: object, options?: object) => void;
}

export default Channel;

export { EMPTY_CHANNEL, createFromPhoenixChannel };
