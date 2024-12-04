import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { LoginUserDto, CreateUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';


@Injectable()
export class AuthService {


  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,  

    private readonly jwtService: JwtService,
  ) {}


  async create(CreateUserDto: CreateUserDto) {
    
    try {

      const { password, ...userData } = CreateUserDto;

    
      const user = this.userRepository.create( {
        ...userData,
        password: await bcrypt.hashSync(password, 10),
      } );

      await this.userRepository.save(user);
      delete user.password;

      return {
        ...user,
        token: this.getJwtToken({ id: user.id }),
      };
      
    } catch (error) {
      this.handleDBError(error);
    }




  }

   async login(LoginUserDto: LoginUserDto) {

    const { email, password } = LoginUserDto;
    const user = await this.userRepository.findOne({ 
      where: { email },
      select: { email: true, password: true, id: true },
    });
    if (!user) {
      throw new UnauthorizedException('Credentials are not valid (email)');
    }
    if (!await bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credentials are not valid (password)');
    }

    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
    

  }

  async checkAuthStatus( user: User ){
    
    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  private getJwtToken(payload: JwtPayload) {

    const token = this.jwtService.sign(payload);
    return token;

  }


  private handleDBError(error: any): never {

    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    console.log(error);
    throw new InternalServerErrorException('Please check server logs');
  }


}
