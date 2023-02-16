import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInRequestDTO {
    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    @ApiProperty({ description: 'The email of the user' })
    @IsString()
    public email: string;

    @ApiProperty({ description: 'The password of the user' })
    @IsString()
    public password: string;
}
