import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class LoginDTo {
    @IsEmail({},{message: 'Please provide a valid email'})
    email: string

    @IsNotEmpty({message: 'Password must not be empty'})
    @IsString({message: 'Password must be string'})
    @MinLength(6, {message: 'Password must be atleast of length 5'})
    password: string
}