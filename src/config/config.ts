import { appConfig, appValidation } from './app.config';
import { dbConfig, dbValidation } from './database.config';
import { firebaseConfig, firebaseValidation } from './firebase.config';
import { mailConfig, mailValidation } from './mail.config';
import { rabbitmqConfig, rabbitmqValidation } from './rmq.config';
import { winstonConfig, winstonValidation } from './winston.config';

export const config = [
  appConfig,
  dbConfig,
  winstonConfig,
  mailConfig,
  firebaseConfig,
  rabbitmqConfig,
];

export const validationSchema = appValidation
  .concat(dbValidation)
  .concat(winstonValidation)
  .concat(mailValidation)
  .concat(firebaseValidation)
  .concat(rabbitmqValidation);
