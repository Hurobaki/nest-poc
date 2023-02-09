import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
export class AppController {
    @Get('/config')
    @ApiBearerAuth('jwt')
    getConfig(): object {
        return process.env;
    }
}
