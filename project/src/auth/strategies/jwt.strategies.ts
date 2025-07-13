import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { UserService } from "src/user/user.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UserService
  ) {
    const jwtSecret = configService.get<string>('jwt.secret') || 'JWT_SECRET'
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // extract data from token
      ignoreExpiration: false,
      secretOrKey: jwtSecret
    });
  }

  async validate(payload: any) {
    try {
        const user = await this.userService.getUserById(payload.sub)
        //attached to request.user and made available in any route handler or guard.
        return {
            ...user,
            role: payload.role
        }
    } catch (error) {
        throw new UnauthorizedException('Invalid Token')
    }
  }
}