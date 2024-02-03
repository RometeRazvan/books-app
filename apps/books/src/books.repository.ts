import { Injectable, Logger } from "@nestjs/common";
import { Book } from "./schemas/book.schema";
import { AbstractRepository } from "@app/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";

@Injectable()
export class BooksRepository extends AbstractRepository<Book> {
    protected readonly logger = new Logger(BooksRepository.name);

    constructor(
        @InjectModel(Book.name) bookModel: Model<Book>,
        @InjectConnection() connection: Connection
    ) {
        super(bookModel, connection)
    }
}