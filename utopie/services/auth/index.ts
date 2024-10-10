import {
	AuthenticateParams,
	AuthType,
	RecoverParams,
	RecoverType,
	SignInParams,
	SignUpParams,
	VerifyParams,
	VerifyType,
	ResetParams
} from '@/services/auth/types';
import { comparePasswords, encryptPassword, generateToken, verifyToken } from '@/util/auth';
import { toUserDTO, toUserTokenDTO } from '@/dtos/user';
import { toRecoveryTokenDTO } from '@/dtos/recovery';
import { generateNumber } from '@/util/optimization';
import { UserTokenDTO } from '@/dtos/user/types';
import { RecoveryTokenDTO } from '@/dtos/recovery/types';

import APIError, { Errors } from '@/shared/APIError';

import * as Constants from '@/constants';

import * as mailService from '@/services/mail';

import * as userRepository from '@/repositories/user';
import * as recoveryRepository from '@/repositories/recovery';

export async function authenticate({ token }: AuthenticateParams): Promise<AuthType> {
	const payload = verifyToken<UserTokenDTO>(token);

	if (!payload) {
		throw new APIError(Errors.UNAUTHORIZED, { message: 'Provided token is invalid!' });
	}

	const user = (await userRepository.findOne({ id: payload.id }))!;

	return {
		user: toUserDTO(user),
		token
	};
}

export async function signIn({ name, password }: SignInParams): Promise<AuthType> {
	const user = await userRepository.findOne({ name });

	if (!user) {
		throw new APIError(Errors.UNAUTHORIZED, { message: 'Incorrect email or password!' });
	}

	const match = await comparePasswords(password, user.password);

	if (!match) {
		throw new APIError(Errors.UNAUTHORIZED, { message: 'Incorrect email or password!' });
	}

	const token = generateToken(toUserTokenDTO(user));

	return {
		user: toUserDTO(user),
		token
	};
}

export async function signUp({ name, email, password }: SignUpParams): Promise<AuthType> {
	const userByName = await userRepository.findOne({ name });

	if (userByName) {
		throw new APIError(Errors.NAME_ALREADY_IN_USE);
	}

	const userByEmail = await userRepository.findOne({ email });

	if (userByEmail) {
		throw new APIError(Errors.EMAIL_ALREADY_TAKEN);
	}

	const encryptedPassword = await encryptPassword(password);

	const user = await userRepository.create({ name, email, password: encryptedPassword });

	const token = generateToken(toUserTokenDTO(user));

	return {
		user: toUserDTO(user),
		token
	};
}

export async function recover({ email }: RecoverParams): Promise<RecoverType> {
	const user = await userRepository.findOne({ email });

	if (!user) {
		throw new APIError(Errors.NOT_FOUND, {
			message: 'User with this email address was not found!',
			meta: { email: 'User with this email does not exist!' }
		});
	}

	const code = generateNumber(10000, 99999).toString();
	const expiresAt = new Date();

	expiresAt.setMinutes(expiresAt.getMinutes() + Constants.Security.RECOVERY_CODE_EXPIRATION);

	await recoveryRepository.create({ userId: user.id, code, expiresAt });

	await mailService.sendRecovery({ recipient: user.email, code });

	return {
		code,
		expiresAt
	};
}

export async function verify({ email, code }: VerifyParams): Promise<VerifyType> {
	const user = await userRepository.findOne({ email });

	if (!user) {
		throw new APIError(Errors.NOT_FOUND, {
			message: 'User with this email address was not found!'
		});
	}

	const recovery = await recoveryRepository.findOne({ userId: user.id, code });

	// No recovery code found
	if (!recovery) {
		throw new APIError(Errors.RECOVERY_INVALID);
	}

	// Recovery code has expired
	if (new Date() > new Date(recovery.expiresAt)) {
		await recoveryRepository.remove({ id: recovery.id });

		throw new APIError(Errors.RECOVERY_EXPIRED);
	}

	const token = generateToken(toRecoveryTokenDTO(recovery), Constants.Security.RECOVERY_TOKEN_EXPIRATION);

	return {
		token
	};
}

export async function reset({ token, password }: ResetParams): Promise<void> {
	const payload = verifyToken<RecoveryTokenDTO>(token);

	if (!payload) {
		throw new APIError(Errors.UNAUTHORIZED, { message: 'Provided token is invalid!' });
	}

	const recovery = await recoveryRepository.findOne({ id: payload.id });

	if (!recovery) {
		throw new APIError(Errors.UNAUTHORIZED, { message: 'Recovery token is not valid!' });
	}

	const encryptedPassword = await encryptPassword(password);

	await userRepository.update(recovery.userId, { password: encryptedPassword });

	await recoveryRepository.remove({ id: recovery.id });
}
