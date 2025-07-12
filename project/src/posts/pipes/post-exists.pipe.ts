import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform } from "@nestjs/common";
import { PostsService } from "../posts.service";

@Injectable()
export class PostExistPipe implements PipeTransform {
    constructor(private readonly postService : PostsService){}

    transform(value: any, metadata: ArgumentMetadata) {
        try{
            const post = this.postService.findPostById(value)
            if(!post) throw new NotFoundException(`Post with ID ${value} not found.`)
        } catch(err){
            throw new NotFoundException(`Post with ID ${value} not found.`)
        }
        return value
    }
}