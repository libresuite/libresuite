import Env from "@libresuite/env";
import { createConsumer, createKafkaClient } from "@libresuite/kafka";
import Logger from "@libresuite/logger";
import app from "@/app";

type UserCreatedPayload = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

const env = new Env();

env.load();

const port = env.get("PORT", "number");
const name = env.get("NAME", "string");
const brokers = env.get("KAFKA_BROKERS", "string").split(",");

async function start() {
  createKafkaClient({ clientId: name, brokers });

  Logger.info({ message: `Kafka client initialized with brokers: ${brokers.join(", ")}`, owner: name });

  await createConsumer<UserCreatedPayload>({ groupId: `${name}-group`, topics: ["user.created"] }, (payload) => {
    Logger.info({
      message: `Received user.created — id: ${payload.id}, email: ${payload.email}`,
      owner: name,
    });
  });

  app.listen(port, () => {
    Logger.info({
      message: `Server is running on port ${port}`,
      owner: name,
    });
  });
}

start().catch((err) => {
  Logger.error({ message: err.message, owner: name });
  process.exit(1);
});
