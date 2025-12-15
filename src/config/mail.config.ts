import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const mailConfig = registerAs('mail', () => ({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT) || 465,
  secure: Number(process.env.MAIL_SECURE),
  auth: {
    username: process.env.MAIL_USERNAME,
    password: process.env.MAIL_PASSWORD,
  },
  from: {
    address: process.env.MAIL_FROM_ADDRESS,
    name: process.env.MAIL_FROM_NAME,
  },
}));

export const mailValidation = Joi.object({
  MAIL_HOST: Joi.string().required(),
  MAIL_PORT: Joi.number(),
  MAIL_USERNAME: Joi.string().required(),
  MAIL_PASSWORD: Joi.string().required(),
});

export type MailConfig = ReturnType<typeof mailConfig>;
