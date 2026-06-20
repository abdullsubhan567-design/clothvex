import { SignJWT, jwtVerify } from 'jose';

const COOKIE_NAME = 'clothvex_admin_session';

function getSecret() {
  const secret = process.env.AUTH_SECRET || 'dev-secret-change-me';
  return new TextEncoder().encode(secret);
}

export async function createSessionToken() {
  return await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecret());
}

export async function verifySessionToken(token) {
  try {
    if (!token) return null;
    const { payload } = await jwtVerify(token, getSecret());
    return payload;
  } catch (e) {
    return null;
  }
}

export const SESSION_COOKIE = COOKIE_NAME;
