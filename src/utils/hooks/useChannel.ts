import { useContext, useEffect, useReducer } from 'react';
import { SocketContext } from '../contexts';
export default {};
// const useChannel = (channelName: string, reducer, initialState) => {
//   const socket = useContext(SocketContext);
//   console.log('useChannel', socket);

//   useEffect(() => {
//     const channel = socket.channel(channelName);
//     if (onMessage) {
//       channel.onMessage = onMessage;
//     }

//     channel
//       .join()
//       .receive('ok', (messages: any) => console.log('catching up', messages))
//       .receive('error', (reason: any) => console.log('failed join', reason))
//       .receive('timeout', (err = '') =>
//         console.log('Networking issue. Still waiting...', err)
//       );

//       return () => channel.leave();
//   }, [channelName]);
// };
