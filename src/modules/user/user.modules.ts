import { Module } from "@nestjs/common";
import { UsersService } from "@/modules/user/user.service";
import { UsersController } from "@/modules/user/user.controller";

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
