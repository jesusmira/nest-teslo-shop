import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../entities/user.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from '@nestjs/config';
import { config } from "process";
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        ConfigService: ConfigService
    ) {

        super({
            secretOrKey: ConfigService.get('JWT_SECRET'),
            
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

    async validate(payload: JwtPayload) : Promise<User> {

        const { id } = payload;

        const user = await this.userRepository.findOneBy({ id });

        if (!user) {
            throw new UnauthorizedException('Token is not valid');
        }
        if ( !user.isActive){
            throw new UnauthorizedException('User is inactive talk to admin');
        }

        return user;
        // return;
     }

}