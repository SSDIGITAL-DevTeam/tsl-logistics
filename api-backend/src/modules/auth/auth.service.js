import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { eq, and, gt } from 'drizzle-orm';
import { db } from '../../../drizzle/db.js';
import { users, passwordResets } from '../../../drizzle/schema.js';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from '../../lib/jwt.js';
import { sendPasswordResetEmail } from '../../lib/mailer.js';
import { env } from '../../config/env.js';

export async function loginService({ email, password }) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user || user.status !== 'active') {
    throw Object.assign(new Error('Invalid email or password'), { status: 401 });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw Object.assign(new Error('Invalid email or password'), { status: 401 });
  }

  const accessToken = signAccessToken({ id: user.id, name: user.name, email: user.email, role: user.role });
  const refreshToken = signRefreshToken({ id: user.id });

  await db.update(users).set({ refreshToken }).where(eq(users.id, user.id));

  return {
    accessToken,
    refreshToken,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  };
}

export async function refreshService(refreshToken) {
  if (!refreshToken) {
    throw Object.assign(new Error('Refresh token missing'), { status: 401 });
  }

  let payload;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    throw Object.assign(new Error('Invalid refresh token'), { status: 403 });
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, payload.id))
    .limit(1);

  if (!user || user.refreshToken !== refreshToken || user.status !== 'active') {
    throw Object.assign(new Error('Invalid refresh token'), { status: 403 });
  }

  const accessToken = signAccessToken({ id: user.id, name: user.name, email: user.email, role: user.role });
  return { accessToken, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
}

export async function logoutService(refreshToken) {
  if (!refreshToken) return;

  try {
    const payload = verifyRefreshToken(refreshToken);
    await db.update(users).set({ refreshToken: null }).where(eq(users.id, payload.id));
  } catch {
    // Token already invalid — still clear the cookie on the client
  }
}

export async function meService(userId) {
  const [user] = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      status: users.status,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user) {
    throw Object.assign(new Error('User not found'), { status: 404 });
  }
  return user;
}

export async function forgotPasswordService(email) {
  const [user] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  // Don't leak whether the email exists
  if (!user) return;

  // Invalidate existing tokens for this email
  await db.delete(passwordResets).where(eq(passwordResets.email, email));

  const token = randomUUID();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await db.insert(passwordResets).values({ email, token, expiresAt });

  const resetUrl = `${env.RESET_LINK_URL}?token=${token}`;
  await sendPasswordResetEmail(email, resetUrl);
}

export async function resetPasswordService({ token, password }) {
  const now = new Date();

  const [record] = await db
    .select()
    .from(passwordResets)
    .where(and(eq(passwordResets.token, token), gt(passwordResets.expiresAt, now)))
    .limit(1);

  if (!record) {
    throw Object.assign(new Error('Invalid or expired reset token'), { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 12);

  await db.update(users).set({ password: hashed }).where(eq(users.email, record.email));
  await db.delete(passwordResets).where(eq(passwordResets.email, record.email));
}
