import { Injectable } from "@nestjs/common";
import { Knex } from "knex";
import { InjectKnex } from "nestjs-knex";
import { City } from "./city.types";

@Injectable()
export class CityService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async getAllCities(): Promise<City[]> {
    const results = await this.knex("city").select("*").orderBy("name", "asc");

    return results.map((row) => ({
      id: row.id,
      name: row.name,
      province: row.province,
      district: row.district,
      latitude: row.latitude,
      longitude: row.longitude,
      population: row.population,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));
  }
}
