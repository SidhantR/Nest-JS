import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable, retry } from "rxjs";
import { UserRole } from "src/user/entities/user.entity";
import { ROLES_KEY } from "../decorators/roles.decorators";

@Injectable()
export class RolesGuard implements CanActivate {
    // reflector is a utility that help access metadata
    constructor(private reflector : Reflector){}

    // When a request hits a route that is protected by a guard (@UseGuards(...)), NestJS will call the guard's canActivate() method
    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
            ROLES_KEY, [
                context.getHandler(), // method level metadata
                context.getClass()    // class level metadata
            ]
        )
        if(!requiredRoles) { // no roles required allow access
            return true
        }

        const request =  context.switchToHttp().getRequest() // to get req obj
        const user = request?.user

        if(!user){
            throw new ForbiddenException('User not Authenticated')
        }
        const hasRequiredRole = requiredRoles.some(role => user.role == role )
        if(!hasRequiredRole){
            throw new ForbiddenException('Insufficient Permission')
        }
        return true
    }
}