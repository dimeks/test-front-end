import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../../config/config.service';

const configService = new ConfigService(process.env.NODE_ENV || 'production');


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getJWTConfig().secret,
    });
  }

  async validate(payload: { id: number }) {
    return {
      id: payload.id
    };
  }
}
