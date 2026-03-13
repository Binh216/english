const BASE_URL = window.__API_BASE_URL__ || 'http://localhost:5000/api';

const buildUrl = (path) => {
  if (!path) return BASE_URL;
  if (path.startsWith('http')) return path;
  return `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
};

const defaultHeaders = () => {
  const token = localStorage.getItem('engflow_token');
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

const request = async (method, path, body, options = {}) => {
  const url = buildUrl(path);
  const init = {
    method,
    headers: {
      ...defaultHeaders(),
      ...(options.headers || {}),
    },
    credentials: 'include',
    ...options,
  };

  if (body != null) {
    init.body = typeof body === 'string' ? body : JSON.stringify(body);
  }

  const res = await fetch(url, init);
  const contentType = res.headers.get('content-type');
  const payload = contentType && contentType.includes('application/json') ? await res.json() : await res.text();

  if (!res.ok) {
    const err = new Error(payload?.message || res.statusText || 'Request failed');
    err.status = res.status;
    err.payload = payload;
    throw err;
  }

  return payload;
};

export const api = {
  get: (path, options) => request('GET', path, null, options),
  post: (path, body, options) => request('POST', path, body, options),
  put: (path, body, options) => request('PUT', path, body, options),
  delete: (path, options) => request('DELETE', path, null, options),
};
