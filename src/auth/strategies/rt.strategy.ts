import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types/jwtPayload.type';
import { JwtPayloadWithRt } from '../types/jwtPayloadWithRt.type';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_REFRESH_SECRET,
            // If true the request will be passed to the verify callback
            passReqToCallback: true
        });
    }

    validate(req: Request, payload: JwtPayload): JwtPayloadWithRt {
        const refreshToken = req?.get('authorization')?.replace('Bearer', '').trim();

        if (!refreshToken) throw new ForbiddenException('Refresh token malformed');

        return {
            ...payload,
            refreshToken
        };
    }
}
