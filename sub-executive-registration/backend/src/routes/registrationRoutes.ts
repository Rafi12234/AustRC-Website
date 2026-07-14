import { Router } from 'express';

import {
  applicationStatusController,
  createApplicationController,
  formOptionsController,
  healthController,
  teamQuestionsController,
} from '../controllers/registrationController';

import {
  photoUpload,
} from '../middleware/photoUpload';

import {
  validate,
} from '../middleware/validate';

import {
  applicationStatusParamsSchema,
  applicationStatusQuerySchema,
  teamIdParamsSchema,
} from '../validators/applicationValidator';

export const registrationRouter =
  Router();

registrationRouter.get(
  '/health',
  healthController,
);

registrationRouter.get(
  '/form-options',
  formOptionsController,
);

registrationRouter.get(
  '/teams/:teamId/questions',

  validate({
    params: teamIdParamsSchema,
  }),

  teamQuestionsController,
);

registrationRouter.post(
  '/applications',

  photoUpload.single('photo'),

  createApplicationController,
);

registrationRouter.get(
  '/applications/:applicationNumber/status',

  validate({
    params:
      applicationStatusParamsSchema,

    query:
      applicationStatusQuerySchema,
  }),

  applicationStatusController,
);