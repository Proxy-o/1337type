import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Strategy, Profile } from 'passport-42';

@Injectable()
export class FtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      clientID:
        ${process.env.CLIENTID},
      clientSecret:
        ${process.env.CLIENTSECRET},
      callbackURL: `${process.env.BACKEND_URL}/auth/42/callback`,
      profileFields: {
        id: function (obj) {
          return String(obj.id);
        },
        login: 'login',
        displayName: 'displayname',
        'name.familyName': 'last_name',
        'name.givenName': 'first_name',
        profileUrl: 'url',
        'emails.0.value': 'email',
        'phoneNumbers.0.value': 'phone',
        'photos.0.value': 'image_url',
      },
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<any> {
    const user = profile;
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
