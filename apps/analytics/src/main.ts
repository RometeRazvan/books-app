import { NestFactory } from '@nestjs/core';
import { AnalyticsModule } from './analytics.module';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(AnalyticsModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('ANALYTICS'));
  await app.startAllMicroservices();
}
bootstrap();
