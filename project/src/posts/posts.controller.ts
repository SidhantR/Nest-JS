import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostInterface } from './interfaces/post.interface';

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
    findOnePost(@Param('id', ParseIntPipe) id : number): PostInterface{
        return this.postsService.findPostById(id)
    }

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createPostData : Omit<PostInterface, 'id' | 'createdAt'>): PostInterface{
        return this.postsService.createPost(createPostData)
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id : number,
    @Body() updateData: Partial<Omit<PostInterface, 'id' | 'createdAt'>>): PostInterface{
        return this.postsService.update(id, updateData)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deletePost(@Param('id', ParseIntPipe) id: number): void{
        this.postsService.remove(id)
    }
}
