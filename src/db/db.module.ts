import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { IDBConfig } from 'src/config';
import {
  Notification,
  NotificationEvent,
  NotificationEventSchema,
  NotificationSchema,
  NotificationSetting,
  NotificationSettingSchema,
  User,
  UserSchema,
} from './schemas';
import {
  NotificationEventRepository,
  NotificationRepository,
  NotificationSettingRepository,
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
      { name: NotificationSetting.name, schema: NotificationSettingSchema },
    ]),
  ],
  providers: [
    NotificationRepository,
    UserRepository,
    NotificationEventRepository,
    NotificationSettingRepository,
  ],
  exports: [
    NotificationRepository,
    UserRepository,
    NotificationEventRepository,
    NotificationSettingRepository,
  ],
})
export class DbModule {}
