import admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
import { Nothing, Some } from 'ts-help';

@Injectable()
export class CatsService {
    async create(createCatDto: CreateCatDto): Promise<string> {
        const cat: Cat = {
            id: new Date().getTime().toString(),
            name: createCatDto.name,
            age: createCatDto.age,
            lastVaccinationTimestamp: createCatDto.lastVaccinationTimestamp
                ? Some(createCatDto.lastVaccinationTimestamp)
                : Nothing
        };

        await admin.firestore().collection('CELINE_POC_CATS').add(cat);

        return 'Your new cat has been successfully created.';
    }

    findAll() {
        return `This action returns all cats`;
    }

    findOne(id: number) {
        return `This action returns a #${id} cat`;
    }

    update(id: number, updateCatDto: UpdateCatDto) {
        return `This action updates a #${id} cat`;
    }

    remove(id: number) {
        return `This action removes a #${id} cat`;
    }
}
