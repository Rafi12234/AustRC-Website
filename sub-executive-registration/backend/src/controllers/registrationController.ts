import type {
  Request,
  Response,
} from 'express';

import { z } from 'zod';

import {
  deleteApplicantPhoto,
  uploadApplicantPhoto,
} from '../config/cloudinary';

import {
  testDatabaseConnection,
} from '../config/database';

import {
  createApplication,
  getApplicationStatus,
  getFormOptions,
  getTeamQuestions,
} from '../services/registrationService';

import type {
  CreateApplicationInput,
} from '../types/registration';

import { AppError } from '../utils/AppError';

import {
  createApplicationSchema,
} from '../validators/applicationValidator';

export async function healthController(
  _request: Request,
  response: Response,
) {
  const databaseInfo =
    await testDatabaseConnection();

  response.json({
    success: true,

    data: {
      service:
        'AUSTRC Sub-Executive Registration API',

      status: 'online',

      database: 'connected',

      databaseName:
        databaseInfo.database,

      serverTime:
        databaseInfo.serverTime,
    },
  });
}

export async function formOptionsController(
  _request: Request,
  response: Response,
) {
  const options =
    await getFormOptions();

  response.json({
    success: true,
    data: options,
  });
}

export async function teamQuestionsController(
  request: Request,
  response: Response,
) {
  const result =
    await getTeamQuestions(
      request.params.teamId as string,
    );

  response.json({
    success: true,
    data: result,
  });
}

function parseApplicationPayload(
  rawPayload: unknown,
): CreateApplicationInput {
  if (
    typeof rawPayload !== 'string' ||
    !rawPayload.trim()
  ) {
    throw new AppError(
      400,
      'MISSING_APPLICATION_PAYLOAD',
      'The application form data is missing.',
    );
  }

  let decodedPayload: unknown;

  try {
    decodedPayload =
      JSON.parse(rawPayload);
  } catch {
    throw new AppError(
      400,
      'INVALID_APPLICATION_PAYLOAD',
      'The application form data is not valid JSON.',
    );
  }

  const parsed =
    createApplicationSchema.safeParse(
      decodedPayload,
    );

  if (!parsed.success) {
    throw new AppError(
      400,
      'VALIDATION_ERROR',
      'Some submitted information is invalid.',
      z.flattenError(parsed.error),
    );
  }

  return parsed.data as CreateApplicationInput;
}

export async function createApplicationController(
  request: Request,
  response: Response,
) {
  const input =
    parseApplicationPayload(
      request.body.payload,
    );

  if (!request.file) {
    throw new AppError(
      400,
      'PHOTO_REQUIRED',
      'Attach a PNG, JPG or JPEG applicant photo.',
    );
  }

  let uploadedPublicId:
    | string
    | null = null;

  try {
    const uploadedPhoto =
      await uploadApplicantPhoto(
        request.file,
        input.fullName,
        input.studentId,
      );

    uploadedPublicId =
      uploadedPhoto.publicId;

    const application =
      await createApplication(
        input,
        uploadedPhoto,
      );

    response.status(201).json({
      success: true,
      data: application,
    });
  } catch (error) {
    if (uploadedPublicId) {
      try {
        await deleteApplicantPhoto(
          uploadedPublicId,
        );
      } catch (cleanupError) {
        console.error(
          'Could not remove orphaned Cloudinary photo:',
          cleanupError,
        );
      }
    }

    throw error;
  }
}

export async function applicationStatusController(
  request: Request,
  response: Response,
) {
  const result =
    await getApplicationStatus(
      request.params
        .applicationNumber as string,

      request.query
        .studentId as string,
    );

  response.json({
    success: true,
    data: result,
  });
}