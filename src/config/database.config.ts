import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const dbConfig = registerAs('db', () => ({
  uri: process.env.DATABASE_URL,
}));

export const dbValidation = Joi.object({
  DATABASE_URL: Joi.string().uri().required(),
});

export type IDBConfig = ReturnType<typeof dbConfig>;
