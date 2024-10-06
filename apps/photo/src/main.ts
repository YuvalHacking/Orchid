import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const port = process.env.PHOTO_SERVICE_PORT || 3002;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: Number(port),
      },
    },
  );

  const logger = new Logger('PhotoMicroservice');

  await app.listen();
  logger.log(`Photo microservice is listening on port ${port}`);
}

bootstrap();
