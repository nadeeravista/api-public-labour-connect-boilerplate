import { ApiProperty } from "@nestjs/swagger";

export class Provider {
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
  profession!: string;

  @ApiProperty()
  address!: string;

  @ApiProperty()
  town!: string;

  @ApiProperty()
  city!: string;

  @ApiProperty()
  country!: string;

  @ApiProperty({ required: false })
  facebookLink?: string;

  @ApiProperty({ required: false })
  twitterLink?: string;

  @ApiProperty({ required: false })
  instagramLink?: string;

  @ApiProperty({ required: false, minimum: 0, maximum: 5 })
  rating?: number;

  @ApiProperty({ required: false })
  experience?: string;

  @ApiProperty({ required: false })
  specializations?: string;

  @ApiProperty({ required: false })
  qualifications?: string;

  @ApiProperty({ required: false })
  availability?: string;

  @ApiProperty({ required: false })
  availableDays?: string;

  @ApiProperty({ required: false })
  completedJobs?: number;

  @ApiProperty({ required: false })
  verified?: boolean;

  @ApiProperty({
    enum: ["active", "inactive", "suspended", "pending"],
    required: false,
  })
  status?: "active" | "inactive" | "suspended" | "pending";

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;

  @ApiProperty({ required: false })
  createdDate?: string;

  @ApiProperty({ required: false })
  photoUrl?: string;
}

export class ProviderResponse {
  @ApiProperty({ type: [Provider] })
  providers!: Provider[];
}

export class CreateProviderDto {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  phone!: string;

  @ApiProperty()
  address!: string;

  @ApiProperty()
  town!: string;

  @ApiProperty()
  city!: string;

  @ApiProperty()
  country!: string;

  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty({ required: false })
  profession?: string;

  @ApiProperty({ required: false })
  qualifications?: string;

  @ApiProperty({ required: false })
  facebookLink?: string;

  @ApiProperty({ required: false })
  twitterLink?: string;

  @ApiProperty({ required: false })
  instagramLink?: string;

  @ApiProperty({ required: false })
  experience?: string;

  @ApiProperty({ required: false })
  specializations?: string;

  @ApiProperty({ required: false })
  availability?: string;

  @ApiProperty({ required: false })
  availableDays?: string;

  @ApiProperty({ required: false })
  completedJobs?: number;

  @ApiProperty({ required: false })
  createdDate?: string;
}

export class UpdateProviderDto {
  @ApiProperty({ required: false })
  userId?: string;

  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty({ required: false })
  phone?: string;

  @ApiProperty({ required: false })
  profession?: string;

  @ApiProperty({ required: false })
  qualifications?: string;

  @ApiProperty({ required: false })
  street?: string;

  @ApiProperty({ required: false })
  city?: string;

  @ApiProperty({ required: false })
  state?: string;

  @ApiProperty({ required: false })
  zipCode?: string;

  @ApiProperty({ required: false })
  country?: string;

  @ApiProperty({ required: false })
  facebookLink?: string;

  @ApiProperty({ required: false })
  twitterLink?: string;

  @ApiProperty({ required: false })
  instagramLink?: string;

  @ApiProperty({ required: false, minimum: 0, maximum: 5 })
  rating?: number;

  @ApiProperty({ required: false })
  experience?: number;

  @ApiProperty({ required: false })
  specializations?: string;

  @ApiProperty({ required: false })
  availability?: string;

  @ApiProperty({ required: false })
  availableDays?: string;

  @ApiProperty({ required: false })
  completedJobs?: number;

  @ApiProperty({ required: false })
  verified?: boolean;

  @ApiProperty({
    enum: ["active", "inactive", "suspended", "pending"],
    required: false,
  })
  status?: "active" | "inactive" | "suspended" | "pending";
}

export class ProviderFilters {
  [key: string]: unknown;
  @ApiProperty({ required: false })
  searchTerm?: string;

  @ApiProperty({ required: false })
  profession?: string;

  @ApiProperty({ required: false })
  city?: string;

  @ApiProperty({ required: false })
  town?: string;

  @ApiProperty({ required: false })
  specialization?: string;

  @ApiProperty({ required: false, minimum: 0, maximum: 5 })
  rating?: number;

  @ApiProperty({ required: false })
  experience?: number;
}
