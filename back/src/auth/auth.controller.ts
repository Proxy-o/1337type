import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FtAuthGuard } from './ft-auth.guard';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Get('42')
  @UseGuards(FtAuthGuard)
  async ftAuth() {}

  @Get('42/callback')
  @UseGuards(FtAuthGuard)
  async ftAuthCallback(@Req() req, @Res() res: Response) {
    const user = req.user._json;
    const token = await this.authService.signIn(user);
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      domain: '.onrender.com',
    });
    res.redirect(`${process.env.FRONTEND_URL}/game`);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async profile(@Req() req) {
    console.log(req.user);
    const user = await this.userService.user({
      id: req.user.id,
    });
    return user;
  }
}
