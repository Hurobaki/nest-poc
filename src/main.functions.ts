import { BadRequestException, INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import express from 'express';
import * as functions from 'firebase-functions';
import { AppModule } from './app.module';
import admin from 'firebase-admin';
import { TestDTO } from './users/dto/test.dto';

/**
 * Comment for the line "main": "dist/main.functions.js" of the package.json :
 *  - This line defines the main.functions.ts file as the entry point for all script commands
 *  - And from what I understood this has no impact on the usual execution of the server with the command `nest start`
 *    because nest fetches the main file in the src/ folder when the entryFile variable is not specified in the nest-cli.json
 */

const server: express.Express = express();

admin.initializeApp();

const createNestServer = async (expressInstance: express.Express): Promise<INestApplication> => {
    if (!process.env.BASE_PATH) {
        throw new Error('Create Nest server failed: missing BASE_PATH environment variable');
    }

    console.log('===================');
    console.log('runWith: ', process.env.CELINE_TEST_API_KEY);
    console.log('===================');

    const app: INestApplication = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance));
    app.useGlobalPipes(
        new ValidationPipe({
            exceptionFactory: e => {
                console.log(`${e}`);
                throw new BadRequestException('Request did not pass data validation');
            }
        })
    );

    const config = new DocumentBuilder()
        .setTitle('Celine POC API')
        .setDescription('')
        .setVersion('0.1')
        .addTag('Auth')
        .addTag('Users')
        /**
         * .addServer allows to add the missing path
         * Without this line the swagger will fetch [deployment_url]/[endpoint] instead of [deployment_url]/[function_name]/[endpoint]
         */
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
        .addSecurityRequirements('jwt')
        .build();

    const options: SwaggerDocumentOptions = {
        /**
         * Custom operationIdFactory that will be used to generate the `operationId`
         * based on the `controllerKey` and `methodKey`
         * @default () => controllerKey_methodKey
         */
        operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
        /**
         * Additional, extra models that should be inspected and included in the specification
         */
        extraModels: [TestDTO]
    };

    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('swagger', app, document);

    return await app.init();
};

createNestServer(server)
    .then(() => console.log('Nest Ready'))
    .catch(err => console.error('Nest broken', err));

export const nestjsPoc: functions.HttpsFunction = functions
    .region('europe-west1')
    .runWith({ secrets: ['CELINE_TEST_API_KEY'] })
    .https.onRequest(server);
