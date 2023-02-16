import { IsNumber, IsString } from 'class-validator';

export class UpdateUserDTO {
    constructor(name: string, age: number, company: string) {
        this.name = name;
        this.age = age;
        this.company = company;
    }

    @IsString()
    public name: string;

    @IsNumber()
    public age?: number = 45;

    @IsString()
    public company: string;
}
