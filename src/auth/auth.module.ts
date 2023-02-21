import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AtStrategy } from './strategies/at.strategy';
import { RtStrategy } from './strategies/rt.strategy';

/**
 * Why the following two cases work :
 * - Exports `UsersService` in users.module.ts and import `UsersModule` in auth.module.ts
 * - Exports `UsersModule` in users.module.ts and add in providers `UsersService` in auth.module.ts
 * And why the following case does not work :
 * - Exports `UsersModule` in users.module.ts and import `UsersModule` in auth.module.ts
 */
@Module({
	imports: [JwtModule.register({}), UsersModule],
	controllers: [AuthController],
	providers: [AuthService, AtStrategy, RtStrategy]
})
export class AuthModule {}
