import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
    constructor(name: string, age: number, company: string, email: string) {
        this.name = name;
        this.age = age;
        this.company = company;
        this.email = email;
    }

    @ApiProperty({ description: 'The name of the user' })
    public name: string;

    @ApiProperty({ description: 'The age of the user' })
    public age: number;

    @ApiProperty({ description: 'The company of the user' })
    public company: string;

    @ApiProperty({ description: 'The email of the user' })
    public email: string;
}
