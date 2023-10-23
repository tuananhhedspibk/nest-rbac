import { Controller, Get, UseGuards } from '@nestjs/common';

import { Roles } from './decorators/roles.decorator';
import { Role } from './enum/roles.enum';

import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

@Controller()
export class AppController {
  @Get('admin')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  async adminOnlyEnpoint() {
    return 'Welcome admin';
  }

  @Get('user-moderator')
  @Roles(Role.USER, Role.MODERATOR)
  @UseGuards(AuthGuard, RoleGuard)
  async userModeratorEndpoint() {
    return 'Welcome user or moderator';
  }
}
