import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDTo } from './dto/register.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService : UserService){}

    @Post('register')
    register(@Body() registerDTo: RegisterDTo){
        return this.userService.register(registerDTo)
    }
}
