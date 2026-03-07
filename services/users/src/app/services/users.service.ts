import type { UserCreateInput } from "@/generated/prisma/models";
import { prisma } from "@/lib";

import type { PrismaClient } from "../../generated/prisma/client";

class UsersService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
    this.getUsers = this.getUsers.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  public async getUsers() {
    return await this.prisma.user.findMany();
  }

  public async getUserById(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  public async createUser(data: UserCreateInput) {
    return await this.prisma.user.create({ data });
  }
}

export default UsersService;
