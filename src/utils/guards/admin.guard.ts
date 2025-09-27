import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

/**
 * Auth0 should assign admin role to the user
 */
@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return user.role.includes("admin");
  }
}
