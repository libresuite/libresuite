import type { Route } from "@libresuite/types";
import { Router } from "express";

import { UsersController } from "@/controllers";
import UsersService from "@/services";

const router: Router = Router();
const path: string = "/";
const service: UsersService = new UsersService();
const controller: UsersController = new UsersController(service);

router.get("/", controller.getUsers);
router.get("/:id", controller.getUserById);
router.post("/", controller.createUser);

const route: Route = {
  path,
  router,
};

export default route;
