import { appConfig, appValidation } from './app.config';
import { dbConfig, dbValidation } from './database.config';
import { firebaseConfig } from './firebase.config';
import { mailConfig, mailValidation } from './mail.config';
import { winstonConfig, winstonValidation } from './winston.config';

export const config = [
  appConfig,
  dbConfig,
  winstonConfig,
  mailConfig,
  firebaseConfig,
];

export const validationSchema = appValidation
  .concat(dbValidation)
  .concat(winstonValidation)
  .concat(mailValidation)
  .concat(firebaseConfig);
