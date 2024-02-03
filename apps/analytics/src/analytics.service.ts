import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AnalyticsService {

  private readonly logger = new Logger(AnalyticsService.name);

  getHello(): string {
    return 'Hello World!';
  }

  book(data: any) {
    this.logger.log(data);
  }
}
