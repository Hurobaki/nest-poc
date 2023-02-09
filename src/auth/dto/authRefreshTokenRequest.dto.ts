import { ApiProperty } from '@nestjs/swagger';

export class AuthRefreshTokenRequestDTO {
    constructor(userId: string, refreshToken: string) {
        this.userId = userId;
        this.refreshToken = refreshToken;
    }

    @ApiProperty({ description: 'The id of the user' })
    public userId: string;

    @ApiProperty({ description: 'Refresh token' })
    public refreshToken: string;
}
