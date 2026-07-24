export const authConfig = {
  jwtSecret: process.env.JWT_SECRET!,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN!,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET!,
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN!,
};