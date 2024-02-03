import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { AuthModule, DatabaseModule, RmqModule } from '@app/common';
import { BooksRepository } from './books.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schemas/book.schema';
import { ANALYTICS_SERVICE } from './constants/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/books/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    RmqModule.register({
      name: ANALYTICS_SERVICE
    }),
    AuthModule,
  ],
  controllers: [BooksController],
  providers: [BooksService, BooksRepository],
})
export class BooksModule { }
