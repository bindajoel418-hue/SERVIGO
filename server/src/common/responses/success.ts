import { Response } from "express";

export function successResponse<T>(
  res: Response,
  message: string,
  data?: T,
  status = 200
) {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
}