import { Body, Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthRequestDTO } from './dto/authRequest.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    /**
     * How it works ?
     * What is the type of request ?
     * What means request.user ?
     */
    @UseGuards(AuthGuard('local'))
    @Post('/login')
    login(@Request() request: any): User {
        return request.user;
    }

    @Post('/connection')
    @HttpCode(200)
    @ApiOperation({ summary: 'Login' })
    @ApiOkResponse({
        status: 200,
        description: 'Connection successful',
        type: User
    })
    @ApiNotFoundResponse({
        description: 'This user has not been registered'
    })
    @ApiBadRequestResponse({
        description: 'The password is incorrect'
    })
    connection(@Body() request: AuthRequestDTO): User {
        return this.authService.login(request.email, request.password);
    }
}
