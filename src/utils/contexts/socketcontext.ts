import { createContext } from 'react';
import { Socket } from 'phoenix';

export default createContext(new Socket('ws://localhost:4000/socket'));