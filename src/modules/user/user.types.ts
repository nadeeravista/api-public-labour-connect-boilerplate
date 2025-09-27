import { ApiProperty } from "@nestjs/swagger";

/**
 * User type for the app and swagger. this will be used to
 * generate types for the frontend app
 */
export class User {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  auth0Id!: string;

  @ApiProperty({ required: false })
  customerId?: string;

  @ApiProperty({ required: false })
  role?: string[];

  @ApiProperty({ required: false })
  providerId?: string;

  @ApiProperty({ required: false })
  email!: string;

  @ApiProperty({ required: false })
  name!: string;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;
}
