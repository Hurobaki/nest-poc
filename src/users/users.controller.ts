import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiConflictResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/createUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('/:id')
    @ApiOperation({ summary: 'Get user by id' })
    @ApiOkResponse({
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

    @Get('/')
    @ApiOperation({ summary: 'Get all users' })
    @ApiOkResponse({
        status: 200,
        description: 'Retrieve users successful',
        type: User,
        isArray: true
    })
    getAllUsers(): User[] {
        return this.usersService.getAll();
    }

    @Post('/create')
    @ApiOperation({ summary: 'Create a new user' })
    @ApiOkResponse({
        status: 200,
        description: 'Create user successful',
        type: User
    })
    @ApiConflictResponse({
        description: 'This email already exists'
    })
    createUser(@Body() dto: CreateUserDTO): User {
        return this.usersService.create(dto);
    }

    @Patch('/update/:id')
    @ApiOperation({ summary: 'Update user' })
    @ApiOkResponse({
        status: 200,
        description: 'Update user successful',
        type: User
    })
    @ApiNotFoundResponse({
        description: 'User does not exist'
    })
    updateUser(@Param('id') id: string, @Body() dto: UpdateUserDTO): User {
        return this.usersService.update(id, dto);
    }

    @Delete('/delete/:id')
    @ApiOperation({ summary: 'Delete user' })
    @ApiOkResponse({
        status: 200,
        description: 'Delete user successful',
        type: User
    })
    @ApiNotFoundResponse({
        description: 'User does not exist'
    })
    deleteUser(@Param('id') id: string): void {
        return this.usersService.delete(id);
    }
}
