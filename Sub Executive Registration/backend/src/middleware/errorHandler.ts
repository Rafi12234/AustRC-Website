import type { ErrorRequestHandler, RequestHandler } from 'express';
import type { DatabaseError } from 'pg';
import { AppError } from '../utils/AppError';

export const notFoundHandler: RequestHandler = (request, response) => {
  response.status(404).json({
    success: false,
    error: {
      code: 'ROUTE_NOT_FOUND',
      message: `No API route exists for ${request.method} ${request.originalUrl}.`,
    },
  });
};

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _request,
  response,
  _next,
) => {
  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
      },
    });
    return;
  }

  const databaseError = error as DatabaseError;

  if (databaseError?.code === '23505') {
    response.status(409).json({
      success: false,
      error: {
        code: 'DUPLICATE_DATA',
        message:
          'An application or applicant with the same Student ID or email already exists.',
      },
    });
    return;
  }

  if (databaseError?.code === '23503' || databaseError?.code === '23514') {
    response.status(400).json({
      success: false,
      error: {
        code: 'DATABASE_CONSTRAINT_ERROR',
        message: 'The submitted information does not match the registration rules.',
      },
    });
    return;
  }

  console.error('Unhandled API error:', error);

  response.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'The server could not complete the request. Please try again.',
    },
  });
};
