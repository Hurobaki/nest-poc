import { ApiProperty } from '@nestjs/swagger';

export class SignUpResponseDTO {
	constructor(accessToken: string, refreshToken: string, userId: string) {
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
		this.userId = userId;
	}

	@ApiProperty({ description: 'Access token' })
	public accessToken: string;

	@ApiProperty({ description: 'Refresh token' })
	public refreshToken: string;

	@ApiProperty({ description: 'The id of the user' })
	public userId: string;
}
