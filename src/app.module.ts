import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AtGuard } from './auth/guard/at.guard';
import { UsersModule } from './users/users.module';

@Module({
    imports: [AuthModule, UsersModule],
    controllers: [AppController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AtGuard
        },
        AppService
    ]
})
export class AppModule {}
