import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { title } from 'process';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post) 
        private postRepository: Repository<Post>
    ) {}

    async findAll(): Promise<Post[]>{
        return this.postRepository.find();
    }

    async findPostById(id: number): Promise<Post> {
        const singlePost = await this.postRepository.findOneBy({id})
        if(!singlePost) {
            throw new NotFoundException(`Post with id ${id} is not found`)
        }
        return singlePost
    }

    async createPost(createPostData: CreatePostDto): Promise<Post> {
        const newPost = this.postRepository.create({
            title: createPostData.title,
            authorName: createPostData.authorName,
            content: createPostData.content,
        })
        return this.postRepository.save(newPost)
    }

    async update(id: number, updatePostData: UpdatePostDto): Promise<Post> {
        const findPostToEdit = await this.findPostById(id);
        Object.assign(findPostToEdit, updatePostData);
        return this.postRepository.save(findPostToEdit)
    }

    async remove(id: number): Promise<void>{
        const postToDelete = await this.findPostById(id)
        this.postRepository.remove(postToDelete)
    }
}
