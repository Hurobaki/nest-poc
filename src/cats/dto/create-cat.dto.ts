import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateCatDto {
    constructor(name: string, age: number, lastVaccinationTimestamp?: number) {
        this.name = name;
        this.age = age;
        this.lastVaccinationTimestamp = lastVaccinationTimestamp;
    }

    /**
     * The name of the cat
     */
    @IsString()
    public name: string;

    /**
     * The age of the cat
     */
    @IsNumber()
    public age: number;

    /**
     * The lastVaccinationTimestamp of the cat
     */
    @IsOptional()
    @IsNumber()
    public lastVaccinationTimestamp?: number;
}
