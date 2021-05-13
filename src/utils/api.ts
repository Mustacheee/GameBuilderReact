import axios from 'axios';
import { CreateGameForm } from '../views/CreateGame';

const API_ERROR = 'error';
const API_SUCCESS = 'success';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const DEFAULT_ERROR = { status: 'error', message: 'Server error occurred' };

const api = axios.create({
  baseURL: BASE_URL,
});

const login = async (values: any) => {
  try {
    const { data } = await api.post('/login', values);
    return data;
  } catch (err) {
    return DEFAULT_ERROR;
  }
};

const createGame = async (values: CreateGameForm, apiToken: string) => {
  try {
    const { data } = await api.post('/games', values, {
        headers: { Authorization: `Bearer ${apiToken}` }
    });
    return data;
  } catch (err) {
    return DEFAULT_ERROR;
  }
};

export { API_ERROR, API_SUCCESS, login, createGame };
