import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class CreateUserDto {
    @ApiProperty({
        description: 'User email',
        example: 'test@mail.com',
        type: 'string',
        uniqueItems: true,
    })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'User password',
        example: '12345678+Abc',
        type: 'string'
    })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

    @ApiProperty({
        description: 'User full name',
        example: 'John Doe',
        type: 'string'
    })
    @IsString()
    @MinLength(1)
    fullName: string;
}