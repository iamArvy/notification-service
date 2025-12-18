import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { IDBConfig } from 'src/config';
import {
  Notification,
  NotificationEvent,
  EventSchema,
  NotificationSchema,
  Setting,
  SettingSchema,
  User,
  UserSchema,
} from './schemas';
import {
  EventRepository,
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
      { name: NotificationEvent.name, schema: EventSchema },
      { name: Setting.name, schema: SettingSchema },
    ]),
  ],
  providers: [
    NotificationRepository,
    UserRepository,
    EventRepository,
    SettingRepository,
  ],
  exports: [
    NotificationRepository,
    UserRepository,
    EventRepository,
    SettingRepository,
  ],
})
export class DbModule {}
