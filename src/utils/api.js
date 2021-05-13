import axios from 'axios';

const API_ERROR = 'error';
const API_SUCCESS = 'success';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const DEFAULT_ERROR = { status: 'error', message: 'Server error occurred' };

const api = axios.create({
  baseURL: BASE_URL,
});

const login = async (values) => {
  try {
    const { data } = await api.post('/login', values);
    return data;
  } catch (err) {
    return DEFAULT_ERROR;
  }
};

export {
    API_ERROR,
    API_SUCCESS,
    login,
}
