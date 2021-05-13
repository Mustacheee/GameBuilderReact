import { Socket } from 'phoenix';

const connect = async (channelName: string) => {
  let socket = new Socket('ws://localhost:4000/socket');
  socket.connect();
  let channel = socket.channel(channelName);

  try {
    channel
      .join()
      .receive('ok', (messages: any) => console.log('catching up', messages))
      .receive('error', (reason: any) => console.log('failed join', reason))
      .receive('timeout', (err = '') =>
        console.log('Networking issue. Still waiting...', err)
      );

      channel.push('tst0', {test: "123"});
      return channel;
  } catch (err) {
    console.log('EEERRRIR', err);
  }
};

const createChannel = (channelName: string) => {
  let socket = new Socket('ws://localhost:4000/socket');
  socket.connect();
  const channel = socket.channel(channelName);

  try {
    channel
      .join()
      .receive('ok', (messages: any) => console.log('catching up', messages))
      .receive('error', (reason: any) => console.log('failed join', reason))
      .receive('timeout', (err = '') =>
        console.log('Networking issue. Still waiting...', err)
      );
  } catch (err) {
    console.log('EEERRRIR', err);
  }
};

export { connect };
