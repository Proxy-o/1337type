import {
  Controller,
  Get,
  Param,
  // Post,
  // Body,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':page')
  findAll(@Param('page') page: number) {
    return this.usersService.users({ skip: page * 20, take: 20 });
  }
}
