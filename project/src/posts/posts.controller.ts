import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostInterface } from './interfaces/post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostExistPipe } from './pipes/post-exists.pipe';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService){}

    @Get()
    getAllPost(@Query('search') search?: string): PostInterface[]{
        const extractAllPost = this.postsService.findAll()
        if(search){
            extractAllPost.filter((singlePost) => 
                singlePost.title.toLowerCase().includes(search.toLowerCase()))
        }
        return extractAllPost
    }

    @Get(':id')
    findOnePost(@Param('id', ParseIntPipe, PostExistPipe) id : number): PostInterface{
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
    create(@Body() createPostData : CreatePostDto): PostInterface{
        return this.postsService.createPost(createPostData)
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe, PostExistPipe) id : number,
    @Body() updateData: UpdatePostDto): PostInterface{
        return this.postsService.update(id, updateData)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deletePost(@Param('id', ParseIntPipe, PostExistPipe) id: number): void{
        this.postsService.remove(id)
    }
}
