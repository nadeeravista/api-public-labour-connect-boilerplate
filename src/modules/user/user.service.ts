import { Injectable } from "@nestjs/common";
import { InjectKnex, Knex } from "nestjs-knex";
import { User } from "@/modules/user/user.types";
import { User as AuthUser } from "@/types";
import { v4 as uuidv4 } from "uuid";

/**
 * All parameterized queries should be in this service to avoid injections
 */
@Injectable()
export class UsersService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async findOrCreate(auth0User: AuthUser): Promise<User> {
    const userInfo = auth0User;

    const user = await this.knex("user")
      .select(
        "user.*",
        "customer.id as customer_id",
        "provider.id as provider_id",
      )
      .where("auth0Id", auth0User.auth0Id)
      .leftJoin("customer", "user.id", "customer.user_id")
      .leftJoin("provider", "user.id", "provider.user_id")
      .first();

    if (!user) {
      const userId = uuidv4();

      const [newUser] = await this.knex("user")
        .insert({
          id: userId,
          auth0Id: auth0User.auth0Id,
          email: userInfo.email || `user-${userInfo.auth0Id}@example.com`,
          name: userInfo.name || `User ${userInfo.auth0Id}`,
        })
        .returning("*");

      return this.transformToUser(newUser, auth0User.role);
    }

    return this.transformToUser(user, auth0User.role);
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await this.knex("user").select("*").where("id", id).first();

    return user ? this.transformToUser(user) : null;
  }

  async getUserByAuth0Id(auth0Id: string): Promise<User | null> {
    const user = await this.knex("user")
      .select("*")
      .where("auth0Id", auth0Id)
      .first();

    return user ? this.transformToUser(user) : null;
  }

  async deleteUser(id: string): Promise<boolean> {
    await this.knex("user").where("id", id).del();

    return true;
  }

  /**
   * No need private access
   */
  private transformToUser(dbRow: any, role?: string[]): User {
    return {
      id: dbRow.id,
      auth0Id: dbRow.auth0Id,
      email: dbRow.email,
      name: dbRow.name,
      role: role || [],
      customerId: dbRow.customer_id,
      providerId: dbRow.provider_id,
      createdAt: dbRow.created_at,
      updatedAt: dbRow.updated_at,
    };
  }
}
