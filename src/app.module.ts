import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { AtGuard } from './modules/auth/guard/at.guard';
import { UsersModule } from './modules/users/users.module';
import { CatsModule } from './modules/cats/cats.module';

@Module({
	imports: [AuthModule, UsersModule, CatsModule],
	controllers: [AppController],
	providers: [
		/**
		 * Set global guard
		 * All endpoints, except those with 'isPublic' metadata (see at.guard.ts), will need an access token
		 */
		{
			provide: APP_GUARD,
			useClass: AtGuard
		},
		AppService
	]
})
export class AppModule {}
