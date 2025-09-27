import { ApiProperty } from "@nestjs/swagger";

export class City {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  province!: string;

  @ApiProperty()
  district!: string;

  @ApiProperty({ required: false })
  latitude?: number;

  @ApiProperty({ required: false })
  longitude?: number;

  @ApiProperty({ required: false })
  population?: number;

  @ApiProperty({ required: false })
  isActive?: boolean;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}

export class CreateCityDto {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  province!: string;

  @ApiProperty()
  district!: string;

  @ApiProperty({ required: false })
  latitude?: number;

  @ApiProperty({ required: false })
  longitude?: number;

  @ApiProperty({ required: false })
  population?: number;

  @ApiProperty({ required: false })
  isActive?: boolean;
}

export class UpdateCityDto {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  province?: string;

  @ApiProperty({ required: false })
  district?: string;

  @ApiProperty({ required: false })
  latitude?: number;

  @ApiProperty({ required: false })
  longitude?: number;

  @ApiProperty({ required: false })
  population?: number;

  @ApiProperty({ required: false })
  isActive?: boolean;
}

export class CityResponse {
  @ApiProperty()
  success!: boolean;

  @ApiProperty()
  data!: City;

  @ApiProperty()
  message!: string;
}
