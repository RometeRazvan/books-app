import { Inject, Injectable } from '@nestjs/common';
import { CreateBookRequest } from './dto/create-book.request';
import { BooksRepository } from './books.repository';
import { ANALYTICS_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { UpdateBookRequest } from './dto/update-book.request';

@Injectable()
export class BooksService {

  constructor(
    private readonly booksRepository: BooksRepository,
    @Inject(ANALYTICS_SERVICE) private analyticsClient: ClientProxy
  ) { }

  async createBook(
    request: CreateBookRequest,
    authentication: string
  ) {
    const session = await this.booksRepository.startTransaction();

    try {
      const book = await this.booksRepository.create(request, { session });
      await lastValueFrom(this.analyticsClient.emit('book_created', {
        request,
        Authentication: authentication,
      }));
      await session.commitTransaction();

      return book;
    }
    catch (err) {
      session.abortTransaction();
      throw err;
    }
  }

  async getBooks(
    authentication: string
  ) {
    const books = this.booksRepository.find({});
    console.log('books', books);

    await lastValueFrom(this.analyticsClient.emit('books_viewed', {
      request: { books: books },
      Authentication: authentication,
    }));
    return books;
  }

  async deleteBook(
    _id: string,
    authentication: string
  ) {
    const book = this.booksRepository.findOneAndDelete({ _id });
    await lastValueFrom(this.analyticsClient.emit('book_deleted', {
      request: { book: book },
      Authentication: authentication,
    }));
    return book;
  }

  async findOneAndUpdate(
    _id: string,
    request: UpdateBookRequest,
    authentication: string
  ) {
    const book = this.booksRepository.findOneAndUpdate({ _id }, request);
    await lastValueFrom(this.analyticsClient.emit('book_updated', {
      request,
      Authentication: authentication,
    }));
    return book;
  }
}
