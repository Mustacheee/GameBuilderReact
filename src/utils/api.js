import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const DEFAULT_ERROR = { status: 'error', message: 'Server error occurred' };

const api = axios.create({
  baseURL: BASE_URL,
});

export const login = async (values) => {
  try {
    const { data } = await api.post('/login', values);
    return data;
  } catch (err) {
    return DEFAULT_ERROR;
  }
};
