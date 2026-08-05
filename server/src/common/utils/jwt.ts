import jwt from "jsonwebtoken";
import { authConfig } from "../../config/auth";

export function generateAccessToken(payload: {
  id: string;
  email: string;
  role: string;
}) {
  return jwt.sign(payload, authConfig.jwtSecret, {
    expiresIn: authConfig.jwtExpiresIn,
  });
}