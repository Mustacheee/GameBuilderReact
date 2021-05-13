import { loadState, saveState } from './localStorage';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer, { RootState } from './reducer';

const cleanState = (persistedState: RootState) => {
  return {
    ...persistedState,
    auth: {
      ...(persistedState.auth || {}),
      isAuthenticated: false,
    },
  };
};

const composeEnhancers =
  (process.env.NODE_ENV === 'development'
    ? (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose
    : null) || compose;

let persistedState = loadState() || {};

const store = createStore(
  reducer,
  cleanState(persistedState),
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => saveState(store.getState()));

export default store;
