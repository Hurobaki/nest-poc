import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatParams } from './dto/CreateCatParams.dto';
import { UpdateCatParams } from './dto/UpdateCatParams.dto';
import { FindOneParams } from './params/FindOneParams';
import {
	ApiBearerAuth,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { JsonDecoder } from 'ts.data.json';
import string = JsonDecoder.string;

@Controller('cats')
@ApiTags('Cats')
export class CatsController {
	constructor(private readonly catsService: CatsService) {}

	@Post()
	@ApiBearerAuth('jwt')
	@ApiOperation({ summary: 'Add a new cat to the database' })
	@ApiOkResponse({
		status: 200,
		description: 'Your new cat has been successfully created.'
	})
	@ApiUnauthorizedResponse({
		description: 'Unauthorized'
	})
	@ApiNotFoundResponse({
		description: 'User does not exist'
	})
	async create(@Body() createCatDto: CreateCatParams): Promise<string> {
		const res = await this.catsService.create(createCatDto);
		return res;
	}

	// @Get()
	// findAll() {
	//     return this.catsService.findAll();
	// }
	//
	@Get('/:id')
	findOne(@Param() params: FindOneParams) {
		return this.catsService.findOne(params);
	}
	//
	// @Patch(':id')
	// update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
	//     return this.catsService.update(+id, updateCatDto);
	// }
	//
	// @Delete(':id')
	// remove(@Param('id') id: string) {
	//     return this.catsService.remove(+id);
	// }
}
