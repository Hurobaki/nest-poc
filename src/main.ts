import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TestDTO } from './users/dto/test.dto';

const bootstrap = async (): Promise<void> => {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Celine POC API')
        .setDescription('')
        .setVersion('0.1')
        .addTag('Auth')
        .addTag('Users')
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
        operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
        // Extra models that should be inspected and included in the specification
        extraModels: [TestDTO]
    };

    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('swagger', app, document);

    await app.listen(3000);
};

bootstrap();
