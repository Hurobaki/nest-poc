import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateUserDTO {
    constructor(name: string, age: number, company: string, email: string) {
        this.name = name;
        this.age = age;
        this.company = company;
        this.email = email;
    }

    @ApiProperty({ description: 'The name of the user' })
    @IsString()
    public name: string;

    @ApiProperty({ description: 'The age of the user' })
    @IsNumber()
    public age: number;

    @ApiProperty({ description: 'The company of the user' })
    @IsString()
    public company: string;

    @ApiProperty({ description: 'The email of the user' })
    @IsString()
    public email: string;
}
