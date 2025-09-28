import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiResponse } from "@nestjs/swagger";
import { CityService } from "./city.service";
import { City } from "./city.types";

/**
 * Public endpoint no guards
 */
@ApiTags("Cities")
@Controller("city")
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  @ApiResponse({ status: 200, type: [City] })
  async findAll(): Promise<City[]> {
    const cities = await this.cityService.getAllCities();
    return cities;
  }
}
