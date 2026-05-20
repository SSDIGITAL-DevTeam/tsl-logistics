import { asyncHandler } from '../../utils/async-handler.js';
import {
  loginService,
  refreshService,
  logoutService,
  meService,
  forgotPasswordService,
  resetPasswordService,
} from './auth.service.js';
import { env } from '../../config/env.js';

const COOKIE_NAME = 'tsl_refresh_token';

function setRefreshCookie(res, token) {
  const opts = {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };
  if (env.COOKIE_DOMAIN) opts.domain = env.COOKIE_DOMAIN;
  res.cookie(COOKIE_NAME, token, opts);
}

function clearRefreshCookie(res) {
  const opts = {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
  };
  if (env.COOKIE_DOMAIN) opts.domain = env.COOKIE_DOMAIN;
  res.clearCookie(COOKIE_NAME, opts);
}

export const login = asyncHandler(async (req, res) => {
  const { accessToken, refreshToken, user } = await loginService(req.body);
  setRefreshCookie(res, refreshToken);
  res.json({ accessToken, user });
});

export const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies[COOKIE_NAME];
  const { accessToken, user } = await refreshService(token);
  res.json({ accessToken, user });
});

export const logout = asyncHandler(async (req, res) => {
  const token = req.cookies[COOKIE_NAME];
  await logoutService(token);
  clearRefreshCookie(res);
  res.json({ message: 'Logged out' });
});

export const me = asyncHandler(async (req, res) => {
  const user = await meService(req.user.id);
  res.json(user);
});

export const forgotPassword = asyncHandler(async (req, res) => {
  await forgotPasswordService(req.body.email);
  res.json({ message: 'If that email exists, a reset link has been sent.' });
});

export const resetPassword = asyncHandler(async (req, res) => {
  await resetPasswordService(req.body);
  res.json({ message: 'Password reset successfully.' });
});
