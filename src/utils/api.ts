import axios from 'axios';
import { CreateGameForm } from '../views/CreateGame';
import { ViewGameForm } from '../views/ViewGame';

const API_ERROR = 'error';
const API_SUCCESS = 'success';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const DEFAULT_ERROR = { status: 'error', message: 'Server error occurred' };

const api = axios.create({
  baseURL: BASE_URL,
  validateStatus: () => true,
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
      headers: { Authorization: `Bearer ${apiToken}` },
    });
    return data;
  } catch (err) {
    return DEFAULT_ERROR;
  }
};

const viewGame = async (gameId: string, apiToken: string) => {
  try {
    const { data } = await api.get(`/games/${gameId}`, {
      headers: { Authorization: `Bearer ${apiToken}` },
    });
    return data;
  } catch (err) {
    console.log('errrrr', err);
    return DEFAULT_ERROR;
  }
};

const createCategory = async (
  gameId: string,
  values: ViewGameForm,
  apiToken: string
) => {
  try {
    const { data } = await api.post(`/games/${gameId}/categories`, values, {
      headers: { Authorization: `Bearer ${apiToken}` },
    });
    return data;
  } catch (err) {
    return DEFAULT_ERROR;
  }
};

const deleteCategory = async (
  gameId: string,
  categoryId: string,
  apiToken: string
) => {
  try {
    const { data } = await api.delete(`/games/${gameId}/categories/${categoryId}`, {
      headers: { Authorization: `Bearer ${apiToken}` },
    });
    return data;
  } catch (err) {
    return DEFAULT_ERROR;
  }
};

export { API_ERROR, API_SUCCESS, login, createGame, viewGame, createCategory, deleteCategory };
