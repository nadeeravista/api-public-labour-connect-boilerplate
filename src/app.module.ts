import { Module } from "@nestjs/common";
import { DatabaseModule } from "./config/database.module";
import { HealthModule } from "./health/health.module";
import { AuthModule } from "./auth/auth.module";
import { ProviderModule } from "./modules/provider/provider.module";

@Module({
  imports: [DatabaseModule, HealthModule, AuthModule, ProviderModule],
})
export class AppModule {}
