import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts/entities/post.entity';

@Module({
  imports: [
    // configure type orm in root module
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres@123',
        database: 'nest-db',
        entities: [Post],    // array of entities that you want to register
        synchronize : true   // Auto-syncs entities to DB on app start (for dev)
    }),
    PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
