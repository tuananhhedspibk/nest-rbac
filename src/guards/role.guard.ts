import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Role } from '../enum/roles.enum';
import { Reflector } from '@nestjs/core';
import { AccessControlService } from '../shared/access-control.service';
import { Observable } from 'rxjs';
import { ROLE_KEY } from '../decorators/roles.decorator';

export class TokenDto {
  id: number;
  role: Role;
}

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private accessControlService: AccessControlService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const token = request['token'] as TokenDto;

    for (const role of requiredRoles) {
      const result = this.accessControlService.isAuthorized({
        requiredRole: role,
        currentRole: token.role,
      });

      if (result) return true;
    }

    return false;
  }
}
