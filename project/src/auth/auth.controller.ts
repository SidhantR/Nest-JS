import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTo } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('login')
    login(@Body() loginDto: LoginDTo) {
        return this.authService.login(loginDto)
    }

    @Post('refreshToken')
    refreshToken(@Body('refreshToken') refreshToken: string){
        return this.authService.refreshToken(refreshToken)
    }
}
