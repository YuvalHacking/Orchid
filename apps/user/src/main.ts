import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const port = process.env.USER_SERVICE_PORT || 3001;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: Number(port),
      },
    },
  );

  const logger = new Logger('UserMicroservice');

  await app.listen();
  logger.log(`User microservice is listening on port ${port}`);
}

bootstrap();
