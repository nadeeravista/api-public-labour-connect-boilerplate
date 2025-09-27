import { Module } from "@nestjs/common";
import { ProviderService } from "@/modules/provider/provider.service";
import { ProviderController } from "@/modules/provider/provider.controller";
import { UsersModule } from "@/modules/user/user.modules";

@Module({
  imports: [UsersModule],
  providers: [ProviderService],
  controllers: [ProviderController],
  exports: [ProviderService],
})
export class ProviderModule {}
