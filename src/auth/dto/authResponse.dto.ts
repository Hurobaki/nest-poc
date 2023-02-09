import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDTO {
    constructor(accessToken: string, refreshToken: string) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    @ApiProperty({ description: 'Access token' })
    public accessToken: string;

    @ApiProperty({ description: 'Refresh token' })
    public refreshToken: string;
}
