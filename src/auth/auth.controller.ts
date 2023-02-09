import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, SetMetadata } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiConflictResponse,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthRefreshTokenRequestDTO } from './dto/authRefreshTokenRequest.dto';
import { AuthResponseDTO } from './dto/authResponse.dto';
import { SignInRequestDTO } from './dto/signInRequest.dto';
import { SignUpRequestDTO } from './dto/signUpRequest.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signup')
    @ApiBearerAuth('jwt')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Sign up' })
    @ApiOkResponse({
        status: 200,
        description: 'Create account successful',
        type: AuthResponseDTO
    })
    @ApiConflictResponse({
        description: 'This user is already registered'
    })
    @ApiForbiddenResponse({
        description: 'Access denied'
    })
    async signUp(@Body() request: SignUpRequestDTO): Promise<AuthResponseDTO> {
        return await this.authService.signUp(request);
    }

    @SetMetadata('isPublic', true)
    @Post('/signin')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Sign in' })
    @ApiOkResponse({
        status: 200,
        description: 'Connection successful',
        type: AuthResponseDTO
    })
    @ApiNotFoundResponse({
        description: 'This user has not been registered'
    })
    @ApiBadRequestResponse({
        description: 'The password is incorrect'
    })
    async signIn(@Body() request: SignInRequestDTO): Promise<AuthResponseDTO> {
        return await this.authService.signIn(request);
    }

    @Get('/logout/:userId')
    @ApiBearerAuth('jwt')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Logout' })
    @ApiOkResponse({
        status: 200,
        description: 'Logout successful',
        type: AuthResponseDTO
    })
    @ApiNotFoundResponse({
        description: 'This user has not been registered'
    })
    @ApiForbiddenResponse({
        description: 'Access denied'
    })
    logout(@Param('userId') userId: string): void {
        return this.authService.logout(userId);
    }

    @SetMetadata('isPublic', true)
    @Post('/refresh')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get new refresh token' })
    @ApiOkResponse({
        status: 200,
        description: 'Logout successful',
        type: AuthResponseDTO
    })
    @ApiForbiddenResponse({
        description: 'Access denied'
    })
    @ApiNotFoundResponse({
        description: 'This user has not been registered'
    })
    refreshTokens(@Body() request: AuthRefreshTokenRequestDTO): Promise<AuthResponseDTO> {
        return this.authService.refreshTokens(request);
    }
}
