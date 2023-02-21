import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types/jwtPayload.type';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor() {
		super({
			// Allows to extract the token from the header authorization
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			// Secret to sign the token
			secretOrKey: process.env.JWT_ACCESS_SECRET
		});
	}

	validate(payload: JwtPayload) {
		return payload;
	}
}
