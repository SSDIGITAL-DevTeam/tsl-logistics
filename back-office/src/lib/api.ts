import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
export const SESSION_TOKEN_KEY = 'tsl_access_token';
export const SESSION_USER_KEY = 'tsl_user';

export function assetUrl(path: string | null | undefined) {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

// Module-level token store (never localStorage — XSS hygiene)
let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function getAccessToken() {
  return accessToken;
}

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // send refresh cookie on cross-subdomain requests
});

// Attach access token to every request
api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Single-flight refresh promise — prevents multiple simultaneous refreshes
let refreshingPromise: Promise<string | null> | null = null;

async function doRefresh(): Promise<string | null> {
  try {
    const { data } = await axios.post<{ accessToken: string }>(
      `${API_URL}/api/auth/refresh`,
      {},
      { withCredentials: true }
    );
    setAccessToken(data.accessToken);
    sessionStorage.setItem(SESSION_TOKEN_KEY, data.accessToken);
    return data.accessToken;
  } catch {
    setAccessToken(null);
    sessionStorage.removeItem(SESSION_TOKEN_KEY);
    return null;
  }
}

// On 401: refresh token, retry original request once
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const status = error.response?.status;
    const shouldTryRefresh = (status === 401 || status === 403) && !original?._retry;

    if (shouldTryRefresh && !original.url?.includes('/api/auth/refresh')) {
      original._retry = true;

      if (!refreshingPromise) {
        refreshingPromise = doRefresh().finally(() => {
          refreshingPromise = null;
        });
      }

      const token = await refreshingPromise;
      if (!token) {
        // Redirect to login
        window.location.href = '/login';
        return Promise.reject(error);
      }

      original.headers.Authorization = `Bearer ${token}`;
      return api(original);
    }
    return Promise.reject(error);
  }
);

export default api;
