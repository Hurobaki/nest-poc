import { ApiProperty } from '@nestjs/swagger';

export class AuthRequestDTO {
    @ApiProperty({ description: 'The email of the user' })
    public email: string;

    @ApiProperty({ description: 'The password of the user' })
    public password: string;
}
