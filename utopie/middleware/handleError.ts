import { Request, Response, NextFunction } from 'express';

export default (error: Error, req: Request, res: Response, next: NextFunction) => {
	res.status(500).json({ message: 'Internal Server Error!' });
};
