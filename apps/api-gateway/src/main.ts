import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common'; 
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.API_GATEWAY_SERVICE_PORT || 3000;

  const logger = new Logger('APIGateway'); 

  await app.listen(port, () => {
    logger.log(`API Gateway is running on port ${port}`); 
  });
}

bootstrap();
