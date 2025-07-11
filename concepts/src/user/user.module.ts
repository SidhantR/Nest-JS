import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HelloModule } from 'src/hello/hello.module';

@Module({
  imports: [HelloModule],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
