import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import * as Constants from '@/constants';

export function comparePasswords(original: string, encrypted: string): Promise<boolean> {
	return bcrypt.compare(original, encrypted);
}

export function encryptPassword(password: string): Promise<string> {
	return bcrypt.hash(password, Constants.Security.SALT_ROUNDS);
}

export function generateToken<T extends object>(payload: T): string {
	return jwt.sign(payload, Constants.Security.JWT_SECRET);
}

export function verifyToken<T extends object>(token: string): T | null {
	try {
		return jwt.verify(token, Constants.Security.JWT_SECRET) as T;
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
