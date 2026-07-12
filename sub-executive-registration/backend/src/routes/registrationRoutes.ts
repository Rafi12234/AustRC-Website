import { Router } from 'express';

import {
  applicationStatusController,
  createApplicationController,
  formOptionsController,
  healthController,
  teamQuestionsController,
} from '../controllers/registrationController';

import { validate } from '../middleware/validate';

import {
  applicationStatusParamsSchema,
  applicationStatusQuerySchema,
  createApplicationSchema,
  teamIdParamsSchema,
} from '../validators/applicationValidator';

export const registrationRouter = Router();

/**
 * Check whether the backend and Neon database are working.
 *
 * GET /api/health
 */
registrationRouter.get('/health', healthController);

/**
 * Get departments, semesters, teams and the active recruitment cycle.
 *
 * GET /api/form-options
 */
registrationRouter.get('/form-options', formOptionsController);

/**
 * Get the screening questions for a selected team.
 *
 * GET /api/teams/:teamId/questions
 */
registrationRouter.get(
  '/teams/:teamId/questions',
  validate({
    params: teamIdParamsSchema,
  }),
  teamQuestionsController,
);

/**
 * Submit a new Sub-Executive application.
 *
 * POST /api/applications
 */
registrationRouter.post(
  '/applications',
  validate({
    body: createApplicationSchema,
  }),
  createApplicationController,
);

/**
 * Check an application's current status.
 *
 * GET /api/applications/:applicationNumber/status?studentId=...
 */
registrationRouter.get(
  '/applications/:applicationNumber/status',
  validate({
    params: applicationStatusParamsSchema,
    query: applicationStatusQuerySchema,
  }),
  applicationStatusController,
);