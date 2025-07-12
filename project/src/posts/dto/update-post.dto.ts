import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdatePostDto {
    @IsOptional()
    @IsNotEmpty({message: 'Title must not be empty'})
    @IsString({message: 'Title must be string'})
    @MinLength(3, {message: 'Title must be atleast of length 3'})
    @MaxLength(50, {message: 'Title can not be longer than length 50'})
    title?: string

    @IsOptional()
    @IsNotEmpty({message: 'Content must not be empty'})
    @IsString({message: 'Content must be string'})
    @MinLength(3, {message: 'Content must be atleast of length 5'})
    content?: string

    @IsOptional()
    @IsNotEmpty({message: 'Author must not be empty'})
    @IsString({message: 'Author must be string'})
    @MinLength(3, {message: 'Author must be atleast of length 3'})
    @MaxLength(50, {message: 'Author can not be longer than length 50'})
    authorName?: string
}