import { RootState } from './reducer';

export const loadState = () => {
  const serializedState = localStorage.getItem('state');
  if (serializedState === null) {
    return undefined;
  }

  return JSON.parse(serializedState);
};

export const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // Log errors here
    console.log(`Error saving state to localstorage: ${err}`);
  }
};

export const clearState = () => {
  localStorage.setItem('state', '');
};
