export type KafkaClientConfig = {
  clientId: string;
  brokers: string[];
};

export type ProducerMessage<T = unknown> = {
  topic: string;
  payload: T;
  key?: string;
};

export type ConsumerConfig = {
  groupId: string;
  topics: string[];
  fromBeginning?: boolean;
};

export type MessageHandler<T = unknown> = (payload: T, topic: string, partition: number) => Promise<void> | void;
