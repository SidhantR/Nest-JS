import { Controller, Get, Param, Query } from '@nestjs/common';
import { HelloService } from './hello.service';

// handling all incoming request and returning responses to the client

@Controller('hello') // hello is the entry route of this particular module 
export class HelloController {
    // dependency injection
    constructor(private readonly helloService: HelloService){}//const helloService = new HelloService(); 
    // automatically create and initialise a class property with same name
    @Get()
    getHello():string {
        return this.helloService.getHello()
    }
    @Get('user/:name')
    getHelloWithName(@Param('name') name: string): string{
        return this.helloService.getHelloWithName(name)
    }
    @Get('query')
    getHelloWithQuery(@Query('name') name : string): string{
        return this.helloService.getHelloWithName(name|| 'world')
    }
}
