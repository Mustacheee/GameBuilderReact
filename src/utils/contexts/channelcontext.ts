import { createContext } from 'react';
import { INITIAL_USER_STATE } from '../../store/reducers';

export default createContext(INITIAL_USER_STATE);