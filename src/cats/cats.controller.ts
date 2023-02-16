import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { FindOneParams } from './params/FindOneParams';

@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

    @Post()
    async create(@Body() createCatDto: CreateCatDto): Promise<string> {
        const res = await this.catsService.create(createCatDto);
        return res;
    }

    // @Get()
    // findAll() {
    //     return this.catsService.findAll();
    // }
    //
    @Get(':id')
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
