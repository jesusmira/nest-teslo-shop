import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.stategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [ 
      ConfigModule,
      TypeOrmModule.forFeature([ User ]),
      PassportModule.register({ defaultStrategy: 'jwt' }),

      JwtModule.registerAsync({
      imports: [ ConfigModule],
      inject: [ ConfigService ],
      useFactory:( configService: ConfigService) => {
        // console.log('JWT_Secret', );
        // console.log('JWT_SECRET', process.env.JWT_SECRET);  
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: '2h' },
        };
      },
      
    }),

      // JwtModule.register({
      // secret: process.env.JWT_SECRET,
      // signOptions: { 
      //   expiresIn: '2h' 
      // },
    // }),
  ],
  exports:[ 
   TypeOrmModule,
   JwtStrategy,
   PassportModule,
   JwtModule, 
  ]
})
export class AuthModule {}
