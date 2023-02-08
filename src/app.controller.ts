import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    @Get('/config')
    getConfig(): object {
        return process.env;
    }
}
