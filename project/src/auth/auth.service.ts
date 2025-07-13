import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTo } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository : Repository<User>,
        private jwtService: JwtService,
        private configService : ConfigService
    ){}

    async login(loginDto: LoginDTo) {
        const user = await this.userRepository.findOne({
            where: {email: loginDto.email}
        })
        // verify user exist and password is correct
        if(!user || !(await this.verifyPassword(loginDto.password, user.password))){
            throw new UnauthorizedException('Invalid credentials or account not exists')
        }

        //generate token
        const tokens = this.generateTokens(user)
        const {password, ...result} = user
        return {
            data: result,
            tokens
        }
    }

    async refreshToken(refreshToken: string) {
        try{
            const payload = this.jwtService.verify(refreshToken, {
                secret: this.configService.get<string>('jwt.refreshSecret')
            })

            const user = await this.userRepository.findOne({
                where: {id: payload.id}
            })

            if(!user){
                throw new UnauthorizedException('Invalid Token')
            }
            const accessToken = this.generateAccessToken(user)
            return {accessToken}
        }catch(err){
            throw new UnauthorizedException('Invalid Token')
        }
    }

    private async verifyPassword (plainPassowrd: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassowrd, hashedPassword)
    }

    private generateTokens(user: User) {
        return {
            accessToken: this.generateAccessToken(user),
            refreshToken: this.generateRefreshToken(user)
        }
    }

    private generateAccessToken (user: User) {
        const payload = {
            email: user.email,
            sub: user.id,
            role: user.role
        }
        return this.jwtService.sign(payload, {
            secret: this.configService.get<string>('jwt.secret'),
            expiresIn: this.configService.get<string>('jwt.secretExpireIn')
        })
    }

    private generateRefreshToken(user: User) {
        const payload = {
            sub: user.id
        }
        return this.jwtService.sign(payload, {
            secret: this.configService.get<string>('jwt.refreshSecret'),
            expiresIn: this.configService.get<string>('jwt.refreshSecretExpireIn')
        })
    }
}
