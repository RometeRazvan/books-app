import { IsNotEmpty, IsString } from "class-validator";

export class CreateBookRequest {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    author: string;
}