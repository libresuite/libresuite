import { publish } from "@libresuite/kafka";
import Logger from "@libresuite/logger";
import { returnApiResponse } from "@libresuite/utils";
import { type Router, Router as ExpressRouter } from "express";

const router: Router = ExpressRouter();

router.post("/users", async (req, res) => {
  const { name, email } = req.body;

  const user = {
    id: crypto.randomUUID(),
    name,
    email,
    createdAt: new Date().toISOString(),
  };

  await publish({ topic: "user.created", key: user.id, payload: user });

  Logger.info({ message: `Published user.created for ${user.id}`, owner: "users" });

  returnApiResponse(res, { status: 201, data: user });
});

export default router;
