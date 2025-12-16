import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { IDBConfig } from 'src/config';
import { Notification, NotificationSchema } from './schemas';
import { NotificationRepository } from './repositories';

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
    ]),
  ],
  providers: [NotificationRepository],
  exports: [NotificationRepository],
})
export class DbModule {}
