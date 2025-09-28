import { Module } from "@nestjs/common";
import { ProviderService } from "./provider.service";
import { ProviderController } from "./provider.controller";
import { UsersModule } from "../user/user.modules";

@Module({
  imports: [UsersModule],
  providers: [ProviderService],
  controllers: [ProviderController],
  exports: [ProviderService],
})
export class ProviderModule {}
