import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { registeredUsers } from '../utils/data';
import { AuthRefreshTokenRequestDTO } from './dto/authRefreshTokenRequest.dto';
import { AuthResponseDTO } from './dto/authResponse.dto';
import { SignInRequestDTO } from './dto/signInRequest.dto';
import { SignUpRequestDTO } from './dto/signUpRequest.dto';
import { SignUpResponseDTO } from './dto/signUpResponse.dto';
import { UserAuth } from './entities/userAuth.entity';
import { JwtPayload } from './types/jwtPayload.type';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly usersService: UsersService) {}

    async signUp(dto: SignUpRequestDTO): Promise<SignUpResponseDTO> {
        const userAuth = registeredUsers.find(auth => auth.email === dto.email);
        if (userAuth) {
            throw new HttpException('User is already registered', HttpStatus.CONFLICT);
        }

        const newUserAuth: UserAuth = {
            userId: Math.random().toString(36).slice(2),
            email: dto.email,
            password: dto.password
        };

        const tokens = await this.getTokens(newUserAuth.userId, newUserAuth.email);
        newUserAuth.refreshToken = tokens.refreshToken;
        registeredUsers.push(newUserAuth);

        this.usersService.create(newUserAuth.userId, dto.email, dto.name, dto.age, dto.company);

        return { ...tokens, userId: newUserAuth.userId };
    }

    async signIn(dto: SignInRequestDTO): Promise<AuthResponseDTO> {
        const indexUserAuth = registeredUsers.findIndex(auth => auth.email === dto.email);

        if (indexUserAuth === -1) {
            throw new HttpException('This user has not been registered', HttpStatus.NOT_FOUND);
        }

        if (registeredUsers[indexUserAuth].password !== dto.password) {
            throw new HttpException('The password is incorrect', HttpStatus.BAD_REQUEST);
        }

        const tokens = await this.getTokens(
            registeredUsers[indexUserAuth].userId,
            registeredUsers[indexUserAuth].email
        );
        registeredUsers[indexUserAuth].refreshToken = tokens.refreshToken;

        return tokens;
    }

    logout(userId: string): void {
        const indexUserAuth = registeredUsers.findIndex(auth => auth.userId === userId);

        if (indexUserAuth === -1) {
            throw new HttpException('This user has not been registered', HttpStatus.NOT_FOUND);
        }

        registeredUsers[indexUserAuth].refreshToken = undefined;
    }

    async refreshTokens(dto: AuthRefreshTokenRequestDTO): Promise<AuthResponseDTO> {
        const indexUserAuth = registeredUsers.findIndex(auth => auth.userId === dto.userId);

        if (indexUserAuth === -1) {
            throw new HttpException('This user has not been registered', HttpStatus.NOT_FOUND);
        }

        if (
            !registeredUsers[indexUserAuth].refreshToken ||
            registeredUsers[indexUserAuth].refreshToken != dto.refreshToken
        ) {
            throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
        }

        const tokens = await this.getTokens(
            registeredUsers[indexUserAuth].userId,
            registeredUsers[indexUserAuth].email
        );
        registeredUsers[indexUserAuth].refreshToken = tokens.refreshToken;

        return tokens;
    }

    async getTokens(userId: string, email: string): Promise<AuthResponseDTO> {
        const jwtPayload: JwtPayload = {
            sub: userId,
            email: email
        };

        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: process.env.JWT_ACCESS_SECRET,
                expiresIn: '5d'
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: '7d'
            })
        ]);

        return {
            accessToken: at,
            refreshToken: rt
        };
    }
}
