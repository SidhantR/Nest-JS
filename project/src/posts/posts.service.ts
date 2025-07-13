import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { title } from 'process';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post) 
        private postRepository: Repository<Post>
    ) {}

    async findAll(): Promise<Post[]>{
        return this.postRepository.find({
            relations: ['author'] // join the User table and include author object
        });
    }

    async findPostById(id: number): Promise<Post> {
        const singlePost = await this.postRepository.findOne({
            where: {id},
            relations: ['author']
        })
        if(!singlePost) {
            throw new NotFoundException(`Post with id ${id} is not found`)
        }
        return singlePost
    }

    async createPost(createPostData: CreatePostDto, author: User): Promise<Post> {
        //The author of the post is the currently logged-in user.
        const newPost = this.postRepository.create({
            title: createPostData.title,
            content: createPostData.content,
            author
        })
        return this.postRepository.save(newPost)
    }

    async update(id: number, updatePostData: UpdatePostDto, author: User): Promise<Post> {
        const post = await this.findPostById(id);
        if(post.author.id !== author.id){
            throw new ForbiddenException('You can only update your own post')
        }
        Object.assign(post, updatePostData);
        return this.postRepository.save(post)
    }

    async remove(id: number, author: User): Promise<void>{
        const post = await this.findPostById(id)
        if(post.author.id !== author.id){
            throw new ForbiddenException('You can only delete your own post')
        }
        this.postRepository.remove(post)
    }
}
