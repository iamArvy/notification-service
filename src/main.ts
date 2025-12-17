import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { API_KEY_HEADER, API_KEY_SECURITY_NAME } from './common/constants';
import { LoggerService, ValidationPipe } from '@nestjs/common';
import { IAppConfig } from './config';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { IRabbitMQConfig } from './config/rmq.config';

function createSwaggerConfig(
  name: string,
  version: string,
  description?: string,
) {
  return new DocumentBuilder()
    .setTitle(name)
    .setDescription(description ?? '')
    .setVersion(version)
    .addSecurity(API_KEY_SECURITY_NAME, {
      type: 'apiKey',
      name: API_KEY_HEADER,
      in: 'header',
    })
    .build();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const { name, description, version, isDev, env, port, url, prefix } =
    config.getOrThrow<IAppConfig>('app');

  const globalPrefix = prefix ? `${prefix}/${version}` : '';

  app.enableCors();
  app.setGlobalPrefix(globalPrefix, { exclude: ['docs'] });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const swaggerConfig = createSwaggerConfig(name, version, description);

  SwaggerModule.setup(
    'docs',
    app,
    SwaggerModule.createDocument(app, swaggerConfig),
    { swaggerOptions: { persistAuthorization: true } },
  );

  const rmqConfig = config.getOrThrow<IRabbitMQConfig>('rabbitmq');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: rmqConfig,
  });

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  if (isDev) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-call
    app.use(require('morgan')('dev'));
  }
  await app.listen(port);

  const logger = app.get<LoggerService>(WINSTON_MODULE_NEST_PROVIDER);
  logger.log(
    `
      ------------
      Internal Application Started!
      Environment: ${env}
      API:${url}
      API Docs: ${url}/docs
      ------------
  `,
    ` ${name} | ${env}`,
  );
}
bootstrap();
