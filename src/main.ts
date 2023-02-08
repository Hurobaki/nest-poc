import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TestDTO } from './users/dto/test.dto';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Celine POC API')
        .setDescription('')
        .setVersion('0.1')
        .addTag('Auth')
        .addTag('Users')
        .build();

    const options: SwaggerDocumentOptions = {
        // Extra models that should be inspected and included in the specification
        extraModels: [TestDTO]
    };

    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('swagger', app, document);

    await app.listen(3000);
}
bootstrap();
