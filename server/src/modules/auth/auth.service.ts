import { AppError } from "../../common/errors/AppError";
import { comparePassword, hashPassword } from "../../common/utils/password";

import { AuthRepository } from "./auth.repository";
import { RegisterUserDto } from "./auth.types";
import { comparePassword } from "../../common/utils/password";
import { generateAccessToken } from "../../common/utils/jwt";
import { LoginDto } from "./auth.types";

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

  async login(data: LoginDto) {
  const user = await this.repository.findUserByEmail(data.email);

  if (!user) {
    throw new AppError(401, "Invalid email or password");
  }

  const validPassword = await comparePassword(
    data.password,
    user.password
  );

  if (!validPassword) {
    throw new AppError(401, "Invalid email or password");
  }

  const token = generateAccessToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  const { password, ...safeUser } = user;

  return {
    user: safeUser,
    accessToken: token,
  };
}
}

