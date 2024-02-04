import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { AuthModule, KafkaModule, RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthGroupConsumer } from './kafka/auth-group.consumer';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_ANALYTICS_QUEUE: Joi.string().required(),
      })
    }),
    KafkaModule,
    RmqModule,
    AuthModule,
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService, AuthGroupConsumer],
})
export class AnalyticsModule { }
