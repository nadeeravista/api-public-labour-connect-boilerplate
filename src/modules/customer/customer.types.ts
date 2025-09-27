import { ApiProperty } from "@nestjs/swagger";

export class Customer {
  @ApiProperty()
  id!: string;

  @ApiProperty({ required: false })
  userId?: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  phone!: string;

  @ApiProperty()
  address!: string;

  @ApiProperty({ enum: ["active", "inactive", "suspended"] })
  status!: "active" | "inactive" | "suspended";

  @ApiProperty()
  registrationDate!: string;

  @ApiProperty()
  totalRequests!: number;

  @ApiProperty({ required: false })
  rating?: number;

  @ApiProperty({ required: false })
  verified?: boolean;

  @ApiProperty({ required: false })
  serviceKeywords?: string;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;
}

export class CustomerResponse {
  @ApiProperty({ type: [Customer] })
  customers!: Customer[];
}

export class CreateCustomerDto {
  @ApiProperty({ required: false })
  userId?: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty({ required: false })
  phone?: string;

  @ApiProperty({ required: false })
  address?: string;

  @ApiProperty({ required: false })
  serviceKeywords?: string;

  @ApiProperty({ required: false })
  status?: string;
}

export class UpdateCustomerDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  phone?: string;

  @ApiProperty()
  address?: string;

  @ApiProperty({ required: false })
  serviceKeywords?: string;
}

export class CustomerFilters {
  [key: string]: unknown;
  @ApiProperty({ required: false })
  id?: string;

  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty({ required: false })
  status?: string;

  @ApiProperty({ required: false })
  phone?: string;

  @ApiProperty({ required: false })
  serviceKeywords?: string;
}
