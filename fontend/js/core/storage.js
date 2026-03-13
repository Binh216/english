const STORAGE_PREFIX = 'engflow_';

const getKey = (key) => `${STORAGE_PREFIX}${key}`;

export const storage = {
  get: (key) => {
    try {
      const raw = localStorage.getItem(getKey(key));
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(getKey(key), JSON.stringify(value));
    } catch {
      // ignore
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(getKey(key));
    } catch {
      // ignore
    }
  },
};
