import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class RegisterDTo {
    @IsEmail({},{message: 'Please provide a valid email'})
    email: string

    @IsNotEmpty({message: 'Name must not be empty'})
    @IsString({message: 'Name must be string'})
    @MinLength(3, {message: 'Name must be atleast of length 3'})
    @MaxLength(50, {message: 'Name can not be longer than length 50'})
    name: string

    @IsNotEmpty({message: 'Password must not be empty'})
    @IsString({message: 'Password must be string'})
    @MinLength(6, {message: 'Password must be atleast of length 5'})
    password: string
}