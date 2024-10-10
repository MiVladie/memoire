export const jwt = {
	SECRET: process.env.JWT_SECRET!
};

export const bcrypt = {
	SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS!)
};
