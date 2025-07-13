import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTo } from './dto/login.dto';
import { LoginThrottlerGuard } from './guards/login-throttler.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @UseGuards(LoginThrottlerGuard)
    @Post('login')
    login(@Body() loginDto: LoginDTo) {
        return this.authService.login(loginDto)
    }

    @Post('refreshToken')
    refreshToken(@Body('refreshToken') refreshToken: string){
        return this.authService.refreshToken(refreshToken)
    }
}
