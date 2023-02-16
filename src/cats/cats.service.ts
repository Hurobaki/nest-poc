import admin from 'firebase-admin';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatEntity } from './entities/cat.entity';
import { Nothing, Some } from 'ts-help';
import { FindOneParams } from './params/FindOneParams';

@Injectable()
export class CatsService {
    async create(createCatDto: CreateCatDto): Promise<string> {
        const cat: CatEntity = {
            id: new Date().getTime().toString(),
            name: createCatDto.name,
            age: createCatDto.age,
            lastVaccinationTimestamp: createCatDto.lastVaccinationTimestamp
                ? Some(createCatDto.lastVaccinationTimestamp)
                : Nothing
        };
        // Rendre l'écriture dans Firestore automatique, utiliser une fonction par collection qui prends la data typée
        // en paramètre et l'ajoute dans la collection
        await admin.firestore().collection('CELINE_POC_CATS').add(cat);

        return 'Your new cat has been successfully created.';
    }

    findAll() {
        return `This action returns all cats`;
    }

    async findOne(params: FindOneParams): Promise<CatEntity> {
        const { id } = params;

        // Rendre la récupération Firestore automatique, utiliser une fonction par collection qui prends l'id en
        // paramètre et fait le décodage de la data avant de la renvoyer typé correctement
        const doc = await admin.firestore().collection('CELINE_POC_CATS').doc(id).get();
        const data = doc.data();

        if (!data) throw new HttpException(`No cat with the ${id} id in database`, HttpStatus.NOT_FOUND);

        return data as CatEntity;
    }

    update(id: number, updateCatDto: UpdateCatDto) {
        return `This action updates a #${id} cat`;
    }

    remove(id: number) {
        return `This action removes a #${id} cat`;
    }
}
