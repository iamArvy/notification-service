import { registerAs } from '@nestjs/config';
import Joi from 'joi';

export interface IRabbitMQConfig {
  urls: string[];
  queue: string;
  queueOptions: {
    durable: boolean;
    deadLetterExchange: string;
    deadLetterRoutingKey: string;
  };
  noAck: boolean;
}

export const rabbitmqConfig = registerAs<IRabbitMQConfig>('rabbitmq', () => ({
  urls: [process.env.RABBITMQ_URL!],
  queue: process.env.RABBITMQ_QUEUE!,
  queueOptions: {
    durable: true,
    deadLetterExchange: process.env.RABBITMQ_DL_EXCHANGE!,
    deadLetterRoutingKey: process.env.RABBITMQ_DL_ROUTING_KEY!,
  },
  noAck: false,
}));

export const rabbitmqValidation = Joi.object({
  RABBITMQ_URL: Joi.string().required(),
  RABBITMQ_QUEUE: Joi.string().required(),
  RABBITMQ_DL_EXCHANGE: Joi.string().required(),
  RABBITMQ_DL_ROUTING_KEY: Joi.string().required(),
});
