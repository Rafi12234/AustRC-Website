import multer from 'multer';

import { AppError } from '../utils/AppError';

const allowedMimeTypes = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
]);

export const photoUpload = multer({
  storage: multer.memoryStorage(),

  limits: {
    files: 1,
    fileSize: 4 * 1024 * 1024,
  },

  fileFilter(_request, file, callback) {
    if (!allowedMimeTypes.has(file.mimetype)) {
      callback(
        new AppError(
          400,
          'INVALID_PHOTO_TYPE',
          'The applicant photo must be a PNG, JPG or JPEG image.',
        ),
      );

      return;
    }

    callback(null, true);
  },
});