import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Product } from 'src/products/entities';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {

    @ApiProperty({
        description: 'User id',
        example: '12345678-1234-1234-1234-123456789012',
        type: 'string',
        uniqueItems: true,
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'User email',
        example: 'user@mail.com',
        type: 'string',
        uniqueItems: true,
    })
    @Column('text',{
        unique: true
    })
    email: string;

    @ApiProperty({
        description: 'User password',
        example: '12345678',
        type: 'string'
    })
    @Column('text',{
        select: false
    })
    password: string;

    @ApiProperty({
        description: 'User full name',
        example: 'John Doe',
        type: 'string'
    })
    @Column('text')
    fullName: string;

    @ApiProperty({
        description: 'User is active',
        example: true,
        type: 'boolean'
    })
    @Column('bool',{
        default: true
    })
    isActive: boolean;

    @ApiProperty({
        description: 'User roles',
        example: ['admin', 'user'],
        type: 'array',
        items: {
            type: 'string'
        }
    })
    @Column('text',{
        array: true, 
        default:['user']
    })
    roles: string[];

    @OneToMany(
        () => Product, 
        (product) =>  product.user,
    )
    product: Product

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();
    }

    
}
