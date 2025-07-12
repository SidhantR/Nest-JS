import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostExistPipe } from './pipes/post-exists.pipe';
import { Post as PostEntity} from './entities/post.entity';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService){}

    @Get()
    async getAllPost(): Promise<PostEntity[]>{
        return this.postsService.findAll()
    }

    @Get(':id')
    async findOnePost(@Param('id', ParseIntPipe, PostExistPipe) id : number): Promise<PostEntity>{
        return this.postsService.findPostById(id)
    }

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true
        })
    )
    async create(@Body() createPostData : CreatePostDto): Promise<PostEntity>{
        return this.postsService.createPost(createPostData)
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe, PostExistPipe) id : number,
    @Body() updateData: UpdatePostDto): Promise<PostEntity>{
        return this.postsService.update(id, updateData)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deletePost(@Param('id', ParseIntPipe, PostExistPipe) id: number): Promise<void>{
        this.postsService.remove(id)
    }
}
