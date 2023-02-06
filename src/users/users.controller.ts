import { Controller, Get, Param } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('/:id')
    @ApiOperation({ summary: 'Get user by id' })
    @ApiResponse({
        status: 200,
        description: 'Retrieve user successful',
        type: User
    })
    @ApiNotFoundResponse({
        description: 'User does not exist'
    })
    getUser(@Param('id') id: string): User {
        return this.usersService.findOne(id);
    }
}
