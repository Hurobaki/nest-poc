import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * AuthGuard takes the name given to PassportStrategy as a parameter
 */
@Injectable()
export class RtGuard extends AuthGuard('jwt-refresh') {
    constructor() {
        super();
    }
}
