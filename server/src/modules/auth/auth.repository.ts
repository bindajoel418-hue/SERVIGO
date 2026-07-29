import { prisma } from "../../config/prisma";
import { RegisterUserDto } from "./auth.types";

export class AuthRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findByPhone(phone: string) {
    return prisma.user.findUnique({
      where: { phone },
    });
  }

  async createUser(data: RegisterUserDto) {
    return prisma.user.create({
      data,
    });
  }

  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }
}