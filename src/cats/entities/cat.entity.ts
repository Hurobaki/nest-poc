import { Maybe } from 'ts-help';

export class Cat {
    constructor(id: string, name: string, age: number, lastVaccinationTimestamp: Maybe<number>) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.lastVaccinationTimestamp = lastVaccinationTimestamp;
    }

    /**
     * The id of the cat
     */
    public id: string;

    /**
     * The name of the cat
     */
    public name: string;

    /**
     * The age of the cat
     */
    public age: number;

    /**
     * The lastVaccinationTimestamp of the cat
     */
    public lastVaccinationTimestamp: Maybe<number>;
}
