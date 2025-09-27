import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { InjectKnex } from "nestjs-knex";
import { Knex } from "knex";
import NodeCache from "node-cache";
import { User } from "@/types";

@Injectable()
export class UserPolicyGuard implements CanActivate {
  private readonly cache = new NodeCache({ stdTTL: 300 });

  constructor(@InjectKnex() private readonly knex: Knex) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.auth0Id) {
      return false;
    }

    const cacheKey = `user_data_${user.auth0Id}`;
    const userCachedData: User | undefined = this.cache.get(cacheKey);

    if (userCachedData) {
      request.user = userCachedData;
      return true;
    }

    if (!userCachedData) {
      const userData = await this.knex("user")
        .leftJoin("customer", "user.id", "customer.user_id")
        .leftJoin("provider", "user.id", "provider.user_id")
        .select(
          "user.id",
          "user.auth0Id",
          "user.email",
          "user.name",
          "customer.id as customerId",
          "provider.id as providerId",
        )
        .where("user.auth0Id", user.auth0Id)
        .first();

      if (userCachedData) {
        this.cache.set(cacheKey, userData);
      }

      request.user = {
        id: userData.id,
        auth0Id: userData.auth0Id,
        customerId: userData.customerId,
        providerId: userData.providerId,
        email: userData.email,
        name: userData.name,
        role: user.role,
      };
      return true;
    }

    return false;
  }

  clearUserCache(auth0Id: string): void {
    const cacheKey = `user_data_${auth0Id}`;
    this.cache.del(cacheKey);
  }

  clearAllCache(): void {
    this.cache.flushAll();
  }
}
