import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import * as Constants from '@/constants';

export function comparePasswords(original: string, encrypted: string): Promise<boolean> {
	return bcrypt.compare(original, encrypted);
}

export function generateToken(userId: number): string {
	return jwt.sign({ user: { id: userId } }, Constants.Security.JWT_SECRET);
}
