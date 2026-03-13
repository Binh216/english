import { api } from '../core/api.js';
import { storage } from '../core/storage.js';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export const authService = {
  isAuthenticated: () => Boolean(storage.get(TOKEN_KEY)),

  getToken: () => storage.get(TOKEN_KEY),

  getUser: () => storage.get(USER_KEY),

  login: async ({ email, password }) => {
    const payload = await api.post('/auth/login', { email, password });
    storage.set(TOKEN_KEY, payload.token);
    storage.set(USER_KEY, payload.user);
    return payload;
  },

  register: async ({ name, email, password }) => {
    const payload = await api.post('/auth/register', { name, email, password });
    storage.set(TOKEN_KEY, payload.token);
    storage.set(USER_KEY, payload.user);
    return payload;
  },

  logout: () => {
    storage.remove(TOKEN_KEY);
    storage.remove(USER_KEY);
  },
};
