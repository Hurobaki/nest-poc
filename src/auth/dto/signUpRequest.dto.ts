import { ApiProperty } from '@nestjs/swagger';

export class SignUpRequestDTO {
    constructor(email: string, password: string, name: string, age: number, company: string) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.age = age;
        this.company = company;
    }

    @ApiProperty({ description: 'The email of the user' })
    public email: string;

    @ApiProperty({ description: 'The password of the user' })
    public password: string;

    @ApiProperty({ description: 'The name of the user' })
    public name: string;

    @ApiProperty({ description: 'The age of the user' })
    public age: number;

    @ApiProperty({ description: 'The company of the user' })
    public company: string;
}
