import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID')!,
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET')!,
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL')!,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, emails, displayName, photos } = profile;

    const verified =
      profile._json?.email_verified === true ||
      profile._json?.verified_email === true;
    if (!emails?.[0]?.value || !verified) {
      return done(
        new UnauthorizedException('E-mail não verificado no perfil Google.'),
        false,
      );
    }

    const user = {
      googleId: id,
      email: emails[0].value,
      nome: displayName,
      avatar: photos?.[0]?.value ?? null,
    };

    done(null, user);
  }
}
