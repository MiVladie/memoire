import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import * as Security from '@/config/security';

export function comparePasswords(original: string, encrypted: string): Promise<boolean> {
	return bcrypt.compare(original, encrypted);
}

export function encryptPassword(password: string): Promise<string> {
	return bcrypt.hash(password, Security.bcrypt.SALT_ROUNDS);
}

export function generateToken<T extends object>(payload: T, expiresIn?: number): string {
	return jwt.sign(payload, Security.jwt.SECRET, expiresIn ? { expiresIn: expiresIn * 60 } : undefined);
}

export function verifyToken<T extends object>(token: string): T | null {
	try {
		return jwt.verify(token, Security.jwt.SECRET) as T;
	} catch (error) {
		return null;
	}
}

export function extractToken(header: string | undefined): string {
	if (!header || !header.includes('Bearer') || header.split(' ').length != 2) {
		return '';
	}

	return header.split(' ')[1];
}
