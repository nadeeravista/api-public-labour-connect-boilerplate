import { Module } from "@nestjs/common";
import { CityService } from "@/modules/city/city.service";
import { CityController } from "@/modules/city/city.controller";

@Module({
  controllers: [CityController],
  providers: [CityService],
  exports: [CityService],
})
export class CityModule {}
