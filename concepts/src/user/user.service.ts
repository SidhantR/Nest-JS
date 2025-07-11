import { Injectable } from '@nestjs/common';
import { HelloService } from 'src/hello/hello.service';

@Injectable()
export class UserService {
    //injecting services from other module
    //hello module must export helloService
    //user service must import helloModule 

    constructor(private readonly helloService: HelloService){}

    getAllUser() {
        return [
            {id: 1, name: 'Sangam'},
            {id: 2, name: 'John'},
            {id: 3, name: 'Victor'}
        ]
    }
    getUserById(id: number) {
        const user = this.getAllUser().find(user => user.id == id);
        return user
    }

    getWelcomeMessage(userId: number) {
        const user = this.getUserById(userId);
        if(!user) return 'User Not Found'
        return this.helloService.getHelloWithName(user?.name)
    }
}
