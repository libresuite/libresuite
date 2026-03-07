import type { Producer } from "kafkajs";
import type { ProducerMessage } from "@/types";
import { getKafkaClient } from "@/client";

let producer: Producer | null = null;

async function getProducer(): Promise<Producer> {
  if (!producer) {
    const kafka = getKafkaClient();
    producer = kafka.producer();
    await producer.connect();
  }
  return producer;
}

export async function publish<T>(message: ProducerMessage<T>): Promise<void> {
  const p = await getProducer();
  await p.send({
    topic: message.topic,
    messages: [
      {
        key: message.key,
        value: JSON.stringify(message.payload),
      },
    ],
  });
}

export async function disconnectProducer(): Promise<void> {
  if (producer) {
    await producer.disconnect();
    producer = null;
  }
}
