import Env from "@libresuite/env";
import { createKafkaClient } from "@libresuite/kafka";
import Logger from "@libresuite/logger";
import app from "@/app";

const env = new Env();

env.load();

const port = env.get("PORT", "number");
const name = env.get("NAME", "string");
const brokers = env.get("KAFKA_BROKERS", "string").split(",");

createKafkaClient({ clientId: name, brokers });

Logger.info({ message: `Kafka client initialized with brokers: ${brokers.join(", ")}`, owner: name });

app.listen(port, () => {
  Logger.info({
    message: `Server is running on port ${port}`,
    owner: name,
  });
});
