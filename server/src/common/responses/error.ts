import { Response } from "express";

export function errorResponse(
  res: Response,
  message: string,
  status = 500,
  errors: unknown[] = []
) {
  return res.status(status).json({
    success: false,
    message,
    errors,
  });
}