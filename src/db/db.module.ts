import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { IDBConfig } from 'src/config';
import {
  Notification,
  NotificationEvent,
  NotificationEventSchema,
  NotificationSchema,
  Setting,
  SettingSchema,
  User,
  UserSchema,
} from './schemas';
import {
  NotificationEventRepository,
  NotificationRepository,
  SettingRepository,
  UserRepository,
} from './repositories';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        const { uri } = config.getOrThrow<IDBConfig>('db');
        return { uri };
      },
    }),
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
      { name: User.name, schema: UserSchema },
      { name: NotificationEvent.name, schema: NotificationEventSchema },
      { name: Setting.name, schema: SettingSchema },
    ]),
  ],
  providers: [
    NotificationRepository,
    UserRepository,
    NotificationEventRepository,
    SettingRepository,
  ],
  exports: [
    NotificationRepository,
    UserRepository,
    NotificationEventRepository,
    SettingRepository,
  ],
})
export class DbModule {}
