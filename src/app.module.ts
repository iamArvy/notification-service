import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './modules/email/email.module';
import { PushModule } from './modules/push/push.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptors';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config, validationSchema, WinstonConfig } from './config';
import { WinstonModule } from 'nest-winston';
import { NotificationModule } from './modules/notification/notification.module';
import { DbModule } from './db/db.module';
import { EventModule } from './modules/notification-event/event.module';
import { UserModule } from './modules/user/user.module';
import { SettingsModule } from './modules/settings/setting.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: config,
      validationSchema,
    }),
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const winstonConfig = config.getOrThrow<WinstonConfig>('winston');
        return winstonConfig;
      },
    }),
    DbModule,
    EmailModule,
    PushModule,
    NotificationModule,
    EventModule,
    UserModule,
    SettingsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
