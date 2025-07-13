import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDTo } from 'src/user/dto/register.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    async register(registerDto : RegisterDTo) {
        return this.createUser(registerDto, UserRole.USER, 'Registration successfully! Please login to continue')
    }

    async registerAdmin(registerDto: RegisterDTo) {
        return this.createUser(registerDto, UserRole.ADMIN, 'Admin Registration successfully')
    }

    async getUserById(userId: number){
        const user = await this.userRepository.findOne({
            where : {id: userId}
        })
        if(!user) throw new UnauthorizedException('User not Found')
        const {password, ...result} = user
        return result
    }

    private async createUser(registerDto : RegisterDTo, role:UserRole, message: string) {
        const existingUser = await this.userRepository.findOne(
        {where: {email: registerDto.email}})   
        if(existingUser){
            throw new ConflictException('Email already in use. Please try different email')
        }
        const hashedPassword = await this.hashPassword(registerDto.password)
        const newlyCreatedUser = this.userRepository.create({
            email: registerDto.email,
            name: registerDto.name,
            password: hashedPassword,
            role
        })
        const saveUser = await this.userRepository.save(newlyCreatedUser)
        const {password, ...result} = saveUser
        return {
            user: result,
            message
        }
    }

    private async hashPassword(password: string) : Promise<string> {
        return bcrypt.hash(password, 10)
    }
}
