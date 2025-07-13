import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RegisterDTo } from './dto/register.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User, UserRole } from './entities/user.entity';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('user')
export class UserController {
    constructor(private userService : UserService){}

    @Post('register')
    register(@Body() registerDTo: RegisterDTo){
        return this.userService.register(registerDTo)
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@CurrentUser() user: User){
        return user
    }

    @Post('create-admin')
    @Roles(UserRole.ADMIN) // add admin role in metadata
    @UseGuards(JwtAuthGuard, RolesGuard)
    createAdmin(@Body() registerDTo: RegisterDTo){
        return this.userService.registerAdmin(registerDTo)
    }
}
