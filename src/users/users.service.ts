import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { users } from '../utils/data';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { User } from './entities/user.entity';
import { Company } from '../utils/models/Company';

@Injectable()
export class UsersService {
	findOne(userId: string): User {
		const user = users.find((user) => user.id === userId);
		if (!user) {
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		}
		return user;
	}

	getAll(): User[] {
		return users;
	}

	create(
		id: string,
		email: string,
		name: string,
		age: number,
		company: string
	): User {
		const user = users.find((user) => user.email === email);

		if (user) {
			throw new HttpException('This email already exists', HttpStatus.CONFLICT);
		}

		const newUser: User = {
			id: id,
			name: name,
			age: age,
			company: Company.Facebook,
			email: email,
			registered: new Date()
		};
		users.push(newUser);

		return newUser;
	}

	update(userId: string, updateUserDTO: UpdateUserDTO): void {
		// const index = users.findIndex((user) => user.id === userId);
		//
		// if (index === -1) {
		// 	throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		// }
		//
		// users[index].name = updateUserDTO.name;
		// users[index].age = updateUserDTO.age;
		// users[index].company = Company.Facebook;
		//
		// return users[index];
	}

	delete(userId: string): void {
		const index = users.findIndex((user) => user.id === userId);
		if (index === -1) {
			throw new HttpException(
				'This user id does not exists',
				HttpStatus.NOT_FOUND
			);
		}

		users.splice(index, 1);
	}
}
