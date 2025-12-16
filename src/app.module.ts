import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './modules/email/email.module';
import { PushModule } from './modules/push/push.module';
import { InAppModule } from './modules/in-app/in-app.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptors';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config, validationSchema, WinstonConfig } from './config';
import { WinstonModule } from 'nest-winston';
import { NotificationModule } from './modules/notification/notification.module';
import { DbModule } from './db/db.module';

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
    InAppModule,
    NotificationModule,
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
