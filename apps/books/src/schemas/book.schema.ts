import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false })
export class Book extends AbstractDocument {
    @Prop()
    name: string

    @Prop()
    author: string
}

export const BookSchema = SchemaFactory.createForClass(Book);