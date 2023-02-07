import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDTO {
    constructor(name: string, age: number, company: string) {
        this.name = name;
        this.age = age;
        this.company = company;
    }

    @ApiProperty({ description: 'The name of the user' })
    public name: string;

    @ApiProperty({ description: 'The age of the user' })
    public age: number;

    @ApiProperty({ description: 'The company of the user' })
    public company: string;
}
