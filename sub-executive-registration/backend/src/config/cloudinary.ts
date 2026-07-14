import {
  v2 as cloudinary,
  type UploadApiResponse,
} from 'cloudinary';

import { env } from './env';

import type {
  UploadedApplicantPhoto,
} from '../types/registration';

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

function makeSafePublicId(
  fullName: string,
  studentId: string,
): string {
  const safeName = fullName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);

  const safeStudentId = studentId
    .replace(/[^a-zA-Z0-9-]/g, '')
    .slice(0, 40);

  return `${safeStudentId}-${safeName}-${Date.now()}`;
}

export async function uploadApplicantPhoto(
  file: Express.Multer.File,
  fullName: string,
  studentId: string,
): Promise<UploadedApplicantPhoto> {
  const result = await new Promise<UploadApiResponse>(
    (resolve, reject) => {
      const uploadStream =
        cloudinary.uploader.upload_stream(
          {
            resource_type: 'image',
            folder: 'austrc/sub-executive-applicants',
            public_id: makeSafePublicId(
              fullName,
              studentId,
            ),
            overwrite: false,

            transformation: [
              {
                width: 1600,
                height: 1600,
                crop: 'limit',
              },
              {
                quality: 'auto:good',
              },
            ],
          },

          (error, uploadResult) => {
            if (error || !uploadResult) {
              reject(
                error ??
                  new Error(
                    'Cloudinary returned no upload result.',
                  ),
              );

              return;
            }

            resolve(uploadResult);
          },
        );

      uploadStream.end(file.buffer);
    },
  );

  return {
    url: result.secure_url,
    publicId: result.public_id,
    originalName: file.originalname,
    format: result.format,
    bytes: result.bytes,
  };
}

export async function deleteApplicantPhoto(
  publicId: string,
): Promise<void> {
  await cloudinary.uploader.destroy(publicId, {
    resource_type: 'image',
    invalidate: true,
  });
}