import axios from 'axios';

const API = axios.create({ baseURL: 'https://pharmacare-django.onrender.com/api/' });

export const signup = (username, password, firstName, lastName, email) =>
  API.post('signup/', { username, password, first_name: firstName, last_name: lastName, email });

export const login = (username, password) =>
  API.post('login/', { username, password });

export const logout = (token) =>
  API.post('logout/', {}, { headers: { Authorization: `Token ${token}` } });
