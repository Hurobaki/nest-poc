import { ApiProperty } from '@nestjs/swagger';

export class User {
    constructor(id: string, name: string, age: number, company: string, email: string, registered: Date) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.company = company;
        this.email = email;
        this.registered = registered;
    }

    @ApiProperty({ description: 'The id of the user' })
    public id: string;

    @ApiProperty({ description: 'The name of the user' })
    public name: string;

    @ApiProperty({ description: 'The age of the user' })
    public age: number;

    @ApiProperty({ description: 'The company of the user' })
    public company: string;

    @ApiProperty({ description: 'The email of the user' })
    public email: string;

    @ApiProperty({ description: 'The registered date of the user' })
    public registered: Date;
}
