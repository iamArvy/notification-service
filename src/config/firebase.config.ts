import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const firebaseConfig = registerAs('firebase', () => ({
  type: process.env.FIREBASE_SERVICE_TYPE as string,
  project_id: process.env.FIREBASE_PROJECT_ID as string,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID as string,
  private_key: process.env.FIREBASE_PRIVATE_KEY as string,
  client_email: process.env.FIREBASE_CLIENT_EMAIL as string,
  client_id: process.env.FIREBASE_CLIENT_ID as string,
  auth_uri: process.env.FIREBASE_AUTH_URI as string,
  token_uri: process.env.FIREBASE_TOKEN_URI as string,
  auth_provider_x509_cert_url: process.env
    .FIREBASE_AUTH_PROVIDER_CERT_URL as string,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL as string,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN as string,
}));

export const firebaseValidation = Joi.object({
  FIREBASE_SERVICE_TYPE: Joi.string().required(),
  FIREBASE_PROJECT_ID: Joi.string().required(),
  FIREBASE_PRIVATE_KEY_ID: Joi.string().required(),
  FIREBASE_PRIVATE_KEY: Joi.string().required(),
  FIREBASE_CLIENT_EMAIL: Joi.string().required(),
  FIREBASE_CLIENT_ID: Joi.string().required(),
  FIREBASE_AUTH_URI: Joi.string().required(),
  FIREBASE_TOKEN_URI: Joi.string().required(),
  FIREBASE_AUTH_PROVIDER_CERT_URL: Joi.string().required(),
  FIREBASE_CLIENT_CERT_URL: Joi.string().required(),
  FIREBASE_UNIVERSE_DOMAIN: Joi.string().required(),
});

export type IFirebaseConfig = ReturnType<typeof firebaseConfig>;
