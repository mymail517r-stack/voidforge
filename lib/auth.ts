import jwt from 'jsonwebtoken';
import { JWTPayload } from '@/types';

const JWT_SECRET = process.env.JWT_SECRET || 'voidforge_super_secret_key_2026';
const JWT_EXPIRES_IN = '7d';

export function generateToken(username: string, role: string): string {
  const payload: Omit<JWTPayload, 'iat' | 'exp'> = { username, role };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

export function validateCredentials(
  username: string,
  password: string,
  adminUsername: string,
  adminPassword: string
): boolean {
  return username === adminUsername && password === adminPassword;
}

export function hashPassword(password: string): string {
  // In production, use bcrypt. For demo, use simple hash
  return Buffer.from(password).toString('base64');
}

export function comparePassword(
  password: string,
  hash: string
): boolean {
  return Buffer.from(password).toString('base64') === hash;
}
