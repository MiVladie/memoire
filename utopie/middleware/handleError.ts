import { Request, Response, NextFunction } from 'express';

export default (error: Error, req: Request, res: Response, next: NextFunction) => {
	console.log(error);

	return res.status(500).json({ message: error?.message || 'Internal Server Error!' });
};
