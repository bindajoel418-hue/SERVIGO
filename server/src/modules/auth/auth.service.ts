import { AppError } from "../../common/errors/AppError";
import { hashPassword } from "../../common/utils/password";

import { AuthRepository } from "./auth.repository";
import { RegisterUserDto } from "./auth.types";

export class AuthService {
  private repository = new AuthRepository();

  async register(data: RegisterUserDto) {
    const existingEmail = await this.repository.findByEmail(data.email);

    if (existingEmail) {
      throw new AppError(409, "Email already exists");
    }

    const existingPhone = await this.repository.findByPhone(data.phone);

    if (existingPhone) {
      throw new AppError(409, "Phone number already exists");
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await this.repository.createUser({
      ...data,
      password: hashedPassword,
    });

    const { password, ...safeUser } = user;

    return safeUser;
  }
}