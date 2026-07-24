import { Request, Response, NextFunction } from "express";

import { AuthService } from "./auth.service";
import { registerSchema } from "./auth.validation";

export class AuthController {
  private authService = new AuthService();

  register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = registerSchema.parse(req.body);

      const user = await this.authService.register(data);

      return res.status(201).json({
        success: true,
        message: "Account created successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };
}