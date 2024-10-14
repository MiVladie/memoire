import { NextFunction, Request, Response } from 'express';
import { convertMegaBytesToBytes, extractFileExtension } from '@/util/file';
import { generateUniqueString } from '@/util/optimization';
import { WithFileRequestHandler } from '@/interfaces/api';
import { FILE_TYPES } from '@/interfaces/file';
import { File, Path } from '@/constants';

import APIError, { Errors } from '@/shared/APIError';
import multer from 'multer';
import path from 'path';

function getStorage(destination: string): multer.StorageEngine {
	return multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, path.join(Path.BASE_DIR, destination));
		},
		filename: (req, file, cb) => {
			cb(null, `${generateUniqueString()}.${extractFileExtension(file.originalname)}`);
		}
	});
}

function getLimits(size: number): multer.Options['limits'] {
	return {
		fileSize: convertMegaBytesToBytes(size)
	};
}

function getFileFilter(extensions: string[]) {
	return (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
		if (!extensions.includes(extractFileExtension(file.originalname.toLowerCase()))) {
			return cb(new APIError(Errors.FILE_TYPE_NOT_ALLOWED));
		}

		return cb(null, true);
	};
}

function withFile(type: FILE_TYPES, req: Request, res: Response, next: NextFunction) {
	let destination: string = '';
	let size: number = 10;
	let extensions: string[] = [];

	switch (type) {
		case FILE_TYPES.IMAGE:
			destination = Path.Shared.images;
			size = File.Image.MAX_SIZE;
			extensions = File.Image.EXTENSIONS;
			break;

		default:
			break;
	}

	multer({
		storage: getStorage(destination),
		limits: getLimits(size),
		fileFilter: getFileFilter(extensions)
	}).single('file')(req, res, (err) => {
		if (err) {
			next(new APIError(Errors.UNKNOWN, { message: err.message }));
		}

		if (!req.file) {
			next(new APIError(Errors.INTERNAL_SERVER_ERROR));
		}

		res.locals.file = req.file;

		next();
	});
}

export const withImage: WithFileRequestHandler = (...e) => withFile(FILE_TYPES.IMAGE, ...e);
