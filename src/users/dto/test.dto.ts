import { ApiProperty } from '@nestjs/swagger';

export class TestDTO {
	constructor(database: string) {
		this.database = database;
	}

	@ApiProperty({ description: 'Description of db' })
	public database: string;
}
