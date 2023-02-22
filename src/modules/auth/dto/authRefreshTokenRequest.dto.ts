import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthRefreshTokenRequestDTO {
	constructor(userId: string, refreshToken: string) {
		this.userId = userId;
		this.refreshToken = refreshToken;
	}

	@ApiProperty({ description: 'The id of the user' })
	@IsString()
	public userId: string;

	@ApiProperty({ description: 'Refresh token' })
	@IsString()
	public refreshToken: string;
}
