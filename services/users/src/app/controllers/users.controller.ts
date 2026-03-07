import { ERROR_MESSAGES } from "@libresuite/constants";
import { handleApiError, returnApiResponse } from "@libresuite/utils";
import type { Request, Response } from "express";

import type UsersService from "@/services";

class UsersController {
  private readonly usersService: UsersService;
  constructor(usersService: UsersService) {
    this.usersService = usersService;
    this.getUsers = this.getUsers.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  public async getUsers(_req: Request, res: Response) {
    try {
      const users = await this.usersService.getUsers();
      return returnApiResponse(res, { data: users });
    } catch (error) {
      return handleApiError(error, res);
    }
  }

  public async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        const error = ERROR_MESSAGES.BAD_REQUEST;
        return returnApiResponse(res, { ...error });
      }
      const user = await this.usersService.getUserById(id as string);
      if (!user) {
        const error = ERROR_MESSAGES.NOT_FOUND;
        return returnApiResponse(res, { ...error });
      }
      return returnApiResponse(res, { data: user });
    } catch (error) {
      return handleApiError(error, res);
    }
  }

  public async createUser(req: Request, res: Response) {
    try {
      const { data } = req.body;
      const user = await this.usersService.createUser(data);
      return returnApiResponse(res, { data: user });
    } catch (error) {
      return handleApiError(error, res);
    }
  }
}

export default UsersController;
