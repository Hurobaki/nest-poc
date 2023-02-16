import { IsString } from 'class-validator';

export class FindOneParams {
    constructor(id: string) {
        this.id = id;
    }

    @IsString()
    id: string;
}
