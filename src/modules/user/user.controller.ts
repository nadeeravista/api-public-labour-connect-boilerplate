import { JwtAuthGuard } from "@/utils/guards/auth.guard";
import { UsersService } from "@/modules/user/user.service";
import { Controller, Get, Delete, Param, Req, UseGuards } from "@nestjs/common";
import { ApiTags, ApiResponse, ApiParam } from "@nestjs/swagger";
import { User } from "@/modules/user/user.types";
import { AdminGuard } from "@/utils/guards/admin.guard";

@ApiTags("Users")
@UseGuards(JwtAuthGuard) // Only JwtAuthGuard can access this controller
@Controller("user")
export class UsersController {
  constructor(private usersService: UsersService) {}

  /**
   * Any user should able to get their own data
   */
  @Get("me")
  @ApiResponse({ status: 200, type: User })
  async getMe(@Req() req: any): Promise<User> {
    return this.usersService.findOrCreate(req.user);
  }

  /**
   * Only admin should able to get other user's data
   */
  @Get(":id")
  @UseGuards(AdminGuard)
  @ApiParam({ name: "id" })
  @ApiResponse({ status: 200, type: User })
  async getUserById(@Param("id") id: string): Promise<User | null> {
    return await this.usersService.getUserById(id);
  }

  /**
   * Only admin should able to delete other user's data
   */
  @Delete(":id")
  @UseGuards(AdminGuard)
  @ApiParam({ name: "id" })
  @ApiResponse({ status: 200 })
  async deleteUser(@Param("id") id: string): Promise<boolean> {
    return await this.usersService.deleteUser(id);
  }
}
