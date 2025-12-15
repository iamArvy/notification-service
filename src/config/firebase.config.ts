import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const firebaseConfig = registerAs('firebase', () => ({
  serviceAccount: process.env.FIREBASE_SERVICE_ACCOUNT,
}));

export const firebaseValidation = Joi.object({
  FIREBASE_SERVICE_ACCOUNT: Joi.object().required(),
});

export type FirebaseConfig = ReturnType<typeof firebaseConfig>;
