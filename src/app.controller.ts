import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOkResponse,
	ApiOperation,
	ApiUnauthorizedResponse
} from '@nestjs/swagger';

@Controller()
export class AppController {
	@Get('/config')
	@ApiBearerAuth('jwt')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Get environment config' })
	@ApiOkResponse({
		status: 200,
		description: 'Get config successful'
	})
	@ApiUnauthorizedResponse({
		description: 'Unauthorized'
	})
	getConfig(): object {
		return process.env;
	}
}
