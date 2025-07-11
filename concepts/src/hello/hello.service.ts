import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {
    getHello(): string {
        return 'hello Nestjs'
    }
    getHelloWithName(name: string): string{
        return `hello ${name}`
    }
}
