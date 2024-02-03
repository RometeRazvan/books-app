import { Controller, Get, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { JwtAuthGuard, RmqService } from '@app/common';

@Controller()
export class AnalyticsController {
  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly rmqService: RmqService
  ) { }

  @Get()
  getHello(): string {
    return this.analyticsService.getHello();
  }

  @EventPattern('book_created')
  @UseGuards(JwtAuthGuard)
  async handleBookCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    this.analyticsService.book(data);
    this.rmqService.ack(context);
  }

  @EventPattern('book_deleted')
  @UseGuards(JwtAuthGuard)
  async handleBookDeleted(@Payload() data: any, @Ctx() context: RmqContext) {
    this.analyticsService.book(data);
    this.rmqService.ack(context);
  }

  @EventPattern('book_updated')
  @UseGuards(JwtAuthGuard)
  async handleBookUpdated(@Payload() data: any, @Ctx() context: RmqContext) {
    this.analyticsService.book(data);
    this.rmqService.ack(context);
  }

  @EventPattern('books_viewed')
  @UseGuards(JwtAuthGuard)
  async handleBooksViewed(@Payload() data: any, @Ctx() context: RmqContext) {
    this.analyticsService.book(data);
    this.rmqService.ack(context);
  }
}
