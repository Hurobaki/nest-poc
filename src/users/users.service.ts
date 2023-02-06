import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { users } from '../utils/data';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    findOne(userId: string): User {
        const user = users.find(user => user.id === userId);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return user;
    }
}
