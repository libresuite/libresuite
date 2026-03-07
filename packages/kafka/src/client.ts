import { Kafka } from "kafkajs";
import type { KafkaClientConfig } from "@/types";

let instance: Kafka | null = null;

export function createKafkaClient({ clientId, brokers }: KafkaClientConfig): Kafka {
  if (!instance) {
    instance = new Kafka({ clientId, brokers });
  }
  return instance;
}

export function getKafkaClient(): Kafka {
  if (!instance) {
    throw new Error("Kafka client not initialized. Call createKafkaClient first.");
  }
  return instance;
}
