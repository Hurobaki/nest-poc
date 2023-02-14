import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDTO {
    constructor(name: string, age: number, company: string) {
        this.name = name;
        this.age = age;
        this.company = company;
    }

    public name: string;

    public age: number;

    public company: string;
}
