import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateProductDto {

    @ApiProperty({ 
        description: 'Product title (unique)',
        nullable: false,
        minLength: 1,
    })
    @IsString()
    @MinLength(1)
    title: string;

    @ApiProperty({
        description: 'Product price',
        nullable: false,
        example: 19.99,
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;

    @ApiProperty({
        description: 'Product description',
        nullable: false,
        example: 'T-shirt with logo on front',
    })
    @IsString()
    @IsOptional()
    description?: string;
    
    @ApiProperty({
        description: 'Product slug',
        nullable: false,
        example: 't-shirt-with-logo-on-front',
    })
    @IsString()
    @IsOptional()
    slug?: string;
    
    @ApiProperty({
        description: 'Product stock',
        nullable: false,
        example: 4,
    })
    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number;
    
    @ApiProperty({
        description: 'Product sizes',
        nullable: false,
        example: ['S','M','L','XL'],
    })
    @IsString({ each: true })
    @IsArray()
    sizes: string[];

    @ApiProperty({
        description: 'Product gender',
        nullable: false,
        example: 'men',
    })
    @IsIn(['men','women','kid','unisex'])
    gender: string;

    @ApiProperty({
        description: 'Product tags',
        nullable: false,
        example: ['t-shirt','logo','front'],
    })
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    tags: string[];
    
    @ApiProperty({
        description: 'Product images',
        nullable: false,
        example: ['https://i.imgur.com/w4e4h.png','https://i.imgur.com/w4e4h.png'],
    })
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images?: string[];

}
