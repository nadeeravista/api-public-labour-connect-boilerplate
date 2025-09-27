import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "@/types";

/**
 * JWT authentication guard. This guard is used to authenticate the user
 * with the JWT token.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  override handleRequest<TUser = User>(err: any, user: any): TUser {
    const userObj: User = {
      id: user.sub,
      auth0Id: user.sub,
      email: user.email || "",
      name: user.name || "",
      customerId: null,
      providerId: null,
      role: user.role,
    };

    return userObj as TUser;
  }
}
