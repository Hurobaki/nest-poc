import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get('/:id')
	@ApiBearerAuth('jwt')
	@ApiOperation({ summary: 'Get user by id' })
	@ApiOkResponse({
		status: 200,
		description: 'Retrieve user successful',
		type: User
	})
	@ApiUnauthorizedResponse({
		description: 'Unauthorized'
	})
	@ApiNotFoundResponse({
		description: 'User does not exist'
	})
	getUser(@Param('id') id: string): User {
		return this.usersService.findOne(id);
	}

	@Get('/')
	@ApiBearerAuth('jwt')
	@ApiOperation({ summary: 'Get all users' })
	@ApiOkResponse({
		status: 200,
		description: 'Retrieve users successful',
		type: User,
		isArray: true
	})
	@ApiUnauthorizedResponse({
		description: 'Unauthorized'
	})
	getAllUsers(): User[] {
		return this.usersService.getAll();
	}

	@Patch('/update/:id')
	@ApiBearerAuth('jwt')
	@ApiOperation({ summary: 'Update user' })
	@ApiOkResponse({
		status: 200,
		description: 'Update user successful',
		type: User
	})
	@ApiUnauthorizedResponse({
		description: 'Unauthorized'
	})
	@ApiNotFoundResponse({
		description: 'User does not exist'
	})
	updateUser(@Param('id') id: string, @Body() dto: UpdateUserDTO): void {
		return this.usersService.update(id, dto);
	}

	@Delete('/delete/:id')
	@ApiBearerAuth('jwt')
	@ApiOperation({ summary: 'Delete user' })
	@ApiOkResponse({
		status: 200,
		description: 'Delete user successful',
		type: User
	})
	@ApiUnauthorizedResponse({
		description: 'Unauthorized'
	})
	@ApiNotFoundResponse({
		description: 'User does not exist'
	})
	deleteUser(@Param('id') id: string): void {
		return this.usersService.delete(id);
	}
}
