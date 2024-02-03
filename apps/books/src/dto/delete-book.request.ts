import { IsNotEmpty, IsString } from "class-validator";

export class DeleteBookRequest {
    @IsString()
    @IsNotEmpty()
    _id: string;
}