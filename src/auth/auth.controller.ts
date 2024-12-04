import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Headers, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IncomingHttpHeaders } from 'http';
import { AuthGuard } from '@nestjs/passport';

import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { RawHeaders, GetUser, Auth } from './decorators';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() CreateUserDto: CreateUserDto) {
    return this.authService.create(CreateUserDto);
  }


  @Post('login')
  loginUser(@Body() LoginUserDto: LoginUserDto) {
    return this.authService.login(LoginUserDto);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(
    @GetUser() user: User,
  ){
    return this.authService.checkAuthStatus( user );
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @Req() request: Express.Request,
    @GetUser() user: User,
    @GetUser('email') useremail: string,

    @RawHeaders() rawHeaders: string,
    @Headers() headers: IncomingHttpHeaders 
  ){
    // console.log(request);


    return {
      ok: true,
      message: 'Hola Mundo Private',
      user,
      useremail,
      rawHeaders
    }
  }

   @Get('private2')
  //  @SetMetadata('roles', ['admin', 'super-user'])
  @RoleProtected( ValidRoles.ADMIN, ValidRoles.SUPER_USER )
   @UseGuards(AuthGuard(), UserRoleGuard)
   privateRoute2(
    @GetUser() user: User,  
   ){

     return {
       ok: true,
       user
     }
   }

   @Get('private3')
   @Auth( ValidRoles.ADMIN, ValidRoles.SUPER_USER )
   privateRoute3(
    @GetUser() user: User,  
   ){

     return {
       ok: true,
       user
     }
   }

  
}
