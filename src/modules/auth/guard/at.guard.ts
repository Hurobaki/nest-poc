import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import {
	IS_PUBLIC_KEY,
	IS_PUBLIC_KEY_TYPE
} from '../../../utils/decorators/Public';

/**
 * AuthGuard takes the name given to PassportStrategy as a parameter
 */
@Injectable()
export class AtGuard extends AuthGuard('jwt') {
	constructor(private readonly reflector: Reflector) {
		super();
	}

	canActivate(context: ExecutionContext) {
		// Check if the endpoint has 'isPublic' metadata
		const isPublic = this.reflector.getAllAndOverride<IS_PUBLIC_KEY_TYPE>(
			IS_PUBLIC_KEY,
			[context.getHandler(), context.getClass()]
		);

		return isPublic || super.canActivate(context);
	}
}
