import { IsNotEmpty, IsString } from "class-validator";

export class UpdateBookRequest {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    author: string;
}