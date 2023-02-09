import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import express from 'express';
import * as functions from 'firebase-functions';
import { AppModule } from './app.module';

const server: express.Express = express();

const createNestServer = async (expressInstance: express.Express): Promise<INestApplication> => {
    if (!process.env.BASE_PATH) {
        throw new Error('Create Nest server failed: missing BASE_PATH environment variable');
    }

    const app: INestApplication = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance));

    const config = new DocumentBuilder()
        .setTitle('Celine POC API')
        .setDescription('')
        .setVersion('0.1')
        .addTag('Auth')
        .addTag('Users')
        .addServer(process.env.BASE_PATH)
        .addBearerAuth(
            {
                in: 'header',
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            },
            'jwt'
        )
        .build();

    const options: SwaggerDocumentOptions = {
        operationIdFactory: (controllerKey: string, methodKey: string) => methodKey
    };

    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('swagger', app, document);

    return await app.init();
};

createNestServer(server)
    .then(() => console.log('Nest Ready'))
    .catch(err => console.error('Nest broken', err));

export const nestjsPoc: functions.HttpsFunction = functions.region('europe-west1').https.onRequest(server);
