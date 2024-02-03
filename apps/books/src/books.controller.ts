import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookRequest } from './dto/create-book.request';
import { JwtAuthGuard } from '@app/common';
import { UpdateBookRequest } from './dto/update-book.request';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createBook(
    @Body() request: CreateBookRequest,
    @Req() req: any
  ) {
    return this.booksService.createBook(request, req.cookies?.Authentication);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getBooks(
    @Req() req: any
  ) {
    return this.booksService.getBooks(req.cookies?.Authentication);
  }

  @Patch(':_id')
  @UseGuards(JwtAuthGuard)
  async updateBook(
    @Param('_id') _id: string,
    @Body() request: UpdateBookRequest,
    @Req() req: any
  ) {
    return this.booksService.findOneAndUpdate(_id, request, req.cookies?.Authentication);
  }

  @Delete(':_id')
  @UseGuards(JwtAuthGuard)
  async deleteBook(
    @Param('_id') _id: string,
    @Req() req: any
  ) {
    return this.booksService.deleteBook(_id, req.cookies?.Authentication);
  }
}