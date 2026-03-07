import type { Consumer } from "kafkajs";

import { getKafkaClient } from "@/client";
import type { ConsumerConfig, MessageHandler } from "@/types";

async function ensureTopicsExist(topics: string[]): Promise<void> {
  const kafka = getKafkaClient();
  const admin = kafka.admin();
  await admin.connect();
  await admin.createTopics({
    topics: topics.map((topic) => ({ topic, numPartitions: 1, replicationFactor: 1 })),
  });
  await admin.disconnect();
}

export async function createConsumer<T>(config: ConsumerConfig, handler: MessageHandler<T>): Promise<Consumer> {
  await ensureTopicsExist(config.topics);

  const kafka = getKafkaClient();
  const consumer = kafka.consumer({ groupId: config.groupId });

  await consumer.connect();

  for (const topic of config.topics) {
    await consumer.subscribe({ topic, fromBeginning: config.fromBeginning ?? false });
  }

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const value = message.value?.toString();
      if (!value) return;

      const payload = JSON.parse(value) as T;
      await handler(payload, topic, partition);
    },
  });

  return consumer;
}
