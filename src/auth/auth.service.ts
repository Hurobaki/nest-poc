import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { registeredUsers } from '../utils/data';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}

    login(username: string, password: string): User {
        const userAuth = registeredUsers.find(auth => auth.email === username);

        if (!userAuth) {
            throw new HttpException('This user has not been registered', HttpStatus.NOT_FOUND);
        }

        if (userAuth.password !== password) {
            throw new HttpException('The password is incorrect', HttpStatus.BAD_REQUEST);
        }

        return this.usersService.findOne(userAuth.userId);
    }
}
