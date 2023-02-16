import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCatParams {
    constructor(name: string, age: number, lastVaccinationTimestamp?: number) {
        this.name = name;
        this.age = age;
        this.lastVaccinationTimestamp = lastVaccinationTimestamp;
    }

    /**
     * The name of the cat
     */
    @IsString()
    name: string;

    /**
     * The age of the cat
     */
    @IsNumber()
    age: number;

    /**
     * The lastVaccinationTimestamp of the cat
     */
    @IsOptional()
    @IsNumber()
    lastVaccinationTimestamp?: number;
}
