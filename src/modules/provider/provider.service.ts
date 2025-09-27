import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectKnex } from "nestjs-knex";
import { Knex } from "knex";
import {
  Provider,
  ProviderResponse,
  CreateProviderDto,
  UpdateProviderDto,
  ProviderFilters,
} from "./provider.types";
import { applyDynamicFilters } from "@/modules/query.utils";
import { UsersService } from "@/modules/user/user.service";
import { generateId, getCurrentDateTime } from "@/utils/iD.utils";

@Injectable()
export class ProviderService {
  constructor(
    @InjectKnex() private readonly knex: Knex,
    private usersService: UsersService,
  ) {}

  private camelToSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }

  async getAllProviders(filters?: ProviderFilters): Promise<ProviderResponse> {
    const query = this.knex("provider")
      .select([
        "id",
        "user_id as userId",
        "name",
        "email",
        "phone",
        "profession",
        "photo_url as photoUrl",
        "address",
        "town",
        "city",
        "country",
        "verified",
        "facebook_link as facebookLink",
        "twitter_link as twitterLink",
        "instagram_link as instagramLink",
        "rating",
        "experience",
        "specializations",
        "availability",
        "available_days as availableDays",
        "completed_jobs as completedJobs",
        "status",
        "created_date as createdDate",
        "created_at as createdAt",
        "updated_at as updatedAt",
      ])
      .modify((query) => {
        if (filters) {
          const filterMapping: Record<string, string> = {
            "search-term": "provider.name",
            profession: "provider.profession",
            city: "provider.city",
            town: "provider.town",
          };

          applyDynamicFilters(query, filters, filterMapping);

          if (filters.rating !== undefined) {
            query.where("provider.rating", ">=", filters.rating);
          }

          if (filters.experience !== undefined) {
            query.where("provider.experience", ">=", filters.experience);
          }

          if (filters.specialization !== undefined) {
            query.where(
              "provider.specializations",
              "ilike",
              `%${filters.specialization}%`,
            );
          }
        }
      })
      .orderBy("provider.created_at", "desc");

    const providers = await query;

    return {
      providers,
    };
  }

  async getProviderById(id: string): Promise<Provider | null> {
    const provider = await this.knex("provider")
      .select([
        "id",
        "user_id as userId",
        "name",
        "email",
        "phone",
        "profession",
        "photo_url as photoUrl",
        "address",
        "town",
        "city",
        "country",
        "verified",
        "facebook_link as facebookLink",
        "twitter_link as twitterLink",
        "instagram_link as instagramLink",
        "rating",
        "experience",
        "specializations",
        "qualifications",
        "availability",
        "available_days as availableDays",
        "completed_jobs as completedJobs",
        "status",
        "created_date as createdDate",
        "created_at as createdAt",
        "updated_at as updatedAt",
      ])
      .where("id", id)
      .first();

    if (!provider) {
      return null;
    }

    return provider;
  }

  async createProvider(createProviderDto: CreateProviderDto, userId?: string) {
    const now = getCurrentDateTime();
    const id = generateId("PRO");

    if (!userId) {
      throw new BadRequestException("User ID is required");
    }

    const user = await this.usersService.getUserById(userId);

    if (!user) {
      throw new BadRequestException(`User not found ${userId}`);
    }

    const provider = await this.getProviderByUserId(user.id);

    if (provider) {
      throw new BadRequestException("Provider already exists");
    }

    return this.knex.transaction(async (trx) => {
      // TODO: Implement file upload functionality
      const uploadResult = { success: true, files: [] };

      const [provider] = await trx("provider")
        .insert({
          id,
          user_id: user?.id,
          name: createProviderDto.name,
          email: user?.email || null,
          phone: createProviderDto.phone,
          profession: createProviderDto.profession,
          photo_url: uploadResult.success ? uploadResult.files[0] : null,
          address: createProviderDto.address,
          town: createProviderDto.town,
          city: createProviderDto.city,
          country: "Sri Lanka",
          facebook_link: createProviderDto.facebookLink || null,
          twitter_link: createProviderDto.twitterLink || null,
          instagram_link: createProviderDto.instagramLink || null,
          experience: createProviderDto.experience || null,
          qualifications: createProviderDto.qualifications || null,
          specializations: createProviderDto.specializations || null,
          availability: createProviderDto.availability || null,
          available_days: createProviderDto.availableDays || null,
          created_date: createProviderDto.createdDate || now,
          status: "pending",
          created_at: now,
          updated_at: now,
        })
        .returning([
          "id",
          "user_id as userId",
          "name",
          "email",
          "phone",
          "profession",
          "photo_url as photoUrl",
          "address",
          "town",
          "city",
          "country",
          "verified",
          "facebook_link as facebookLink",
          "twitter_link as twitterLink",
          "instagram_link as instagramLink",
          "rating",
          "experience",
          "specializations",
          "qualifications",
          "availability",
          "available_days as availableDays",
          "completed_jobs as completedJobs",
          "status",
          "created_date as createdDate",
          "created_at as createdAt",
          "updated_at as updatedAt",
        ]);

      return provider;
    });
  }

  async updateProvider(
    providerId: string,
    updateProviderDto: UpdateProviderDto,
  ): Promise<Provider> {
    const existingProvider = await this.getProviderById(providerId);
    if (!existingProvider) {
      throw new NotFoundException(`Provider not found 1 ${providerId}`);
    }

    return this.knex.transaction(async (trx) => {
      const allowedFields = [
        "userId",
        "name",
        "email",
        "phone",
        "profession",
        "qualifications",
        "address",
        "town",
        "city",
        "country",
        "verified",
        "facebookLink",
        "twitterLink",
        "instagramLink",
        "rating",
        "experience",
        "specializations",
        "availability",
        "availableDays",
        "completedJobs",
        "status",
        "photo_url",
      ];

      const updateData: any = {
        updated_at: getCurrentDateTime(),
      };

      for (const field of allowedFields) {
        if (updateProviderDto[field as keyof UpdateProviderDto] !== undefined) {
          const dbField = this.camelToSnakeCase(field);
          updateData[dbField] =
            updateProviderDto[field as keyof UpdateProviderDto];
        }
      }

      await trx("provider").where("id", providerId).update(updateData);

      const updatedProvider = await this.getProviderById(providerId);
      if (!updatedProvider) {
        throw new NotFoundException(
          `Provider not found after update ${providerId}`,
        );
      }
      return updatedProvider;
    });
  }

  async deleteProvider(id: string): Promise<void> {
    const deletedCount = await this.knex("provider").where("id", id).del();

    if (deletedCount === 0) {
      throw new NotFoundException("Provider not found");
    }
  }

  async getProvidersByCity(city: string): Promise<ProviderResponse> {
    const providers = await this.knex("provider")
      .select([
        "id",
        "user_id as userId",
        "name",
        "email",
        "phone",
        "profession",
        "photo_url as photoUrl",
        "address",
        "town",
        "city",
        "country",
        "verified",
        "facebook_link as facebookLink",
        "twitter_link as twitterLink",
        "instagram_link as instagramLink",
        "rating",
        "experience",
        "specializations",
        "availability",
        "available_days as availableDays",
        "completed_jobs as completedJobs",
        "status",
        "created_date as createdDate",
        "created_at as createdAt",
        "updated_at as updatedAt",
      ])
      .where("city", "ilike", `%${city}%`)
      .where("status", "active")
      .orderBy("rating", "desc")
      .orderBy("experience", "desc");

    return {
      providers,
    };
  }

  async getProvidersBySpecialization(
    specialization: string,
  ): Promise<ProviderResponse> {
    const providers = await this.knex("provider")
      .select([
        "id",
        "user_id as userId",
        "name",
        "email",
        "phone",
        "profession",
        "photo_url as photoUrl",
        "address",
        "town",
        "city",
        "country",
        "verified",
        "facebook_link as facebookLink",
        "twitter_link as twitterLink",
        "instagram_link as instagramLink",
        "rating",
        "experience",
        "specializations",
        "availability",
        "available_days as availableDays",
        "completed_jobs as completedJobs",
        "status",
        "created_date as createdDate",
        "created_at as createdAt",
        "updated_at as updatedAt",
      ])
      .where("specializations", "ilike", `%${specialization}%`)
      .where("status", "active")
      .orderBy("rating", "desc")
      .orderBy("experience", "desc");

    return {
      providers,
    };
  }

  async getTopRatedProviders(limit: number = 10): Promise<ProviderResponse> {
    const providers = await this.knex("provider")
      .select([
        "id",
        "user_id as userId",
        "name",
        "email",
        "phone",
        "profession",
        "photo_url as photoUrl",
        "address",
        "town",
        "city",
        "country",
        "verified",
        "facebook_link as facebookLink",
        "twitter_link as twitterLink",
        "instagram_link as instagramLink",
        "rating",
        "experience",
        "specializations",
        "availability",
        "available_days as availableDays",
        "completed_jobs as completedJobs",
        "status",
        "created_date as createdDate",
        "created_at as createdAt",
        "updated_at as updatedAt",
      ])
      .where("status", "active")
      .whereNotNull("rating")
      .orderBy("rating", "desc")
      .orderBy("completed_jobs", "desc")
      .limit(limit);

    return {
      providers,
    };
  }

  async getProviderByUserId(userId: string): Promise<Provider | null> {
    const result = await this.knex("provider").where("user_id", userId).first();

    return result || null;
  }

  async getProviderByAuth0Id(auth0Id: string): Promise<Provider | null> {
    const result = await this.knex("provider")
      .select([
        "provider.id",
        "provider.user_id as userId",
        "provider.name",
        "provider.email",
        "provider.phone",
        "provider.profession",
        "provider.photo_url as photoUrl",
        "provider.address",
        "provider.town",
        "provider.city",
        "provider.country",
        "provider.verified",
        "provider.facebook_link as facebookLink",
        "provider.twitter_link as twitterLink",
        "provider.instagram_link as instagramLink",
        "provider.rating",
        "provider.experience",
        "provider.specializations",
        "provider.qualifications",
        "provider.availability",
        "provider.available_days as availableDays",
        "provider.completed_jobs as completedJobs",
        "provider.status",
        "provider.created_date as createdDate",
        "provider.created_at as createdAt",
        "provider.updated_at as updatedAt",
      ])
      .join("user", "provider.user_id", "user.id")
      .where("user.auth0Id", auth0Id)
      .first();

    if (!result) {
      return null;
    }

    return result;
  }

  async deleteProviderPhoto(providerId: string): Promise<void> {
    const provider = await this.getProviderById(providerId);

    await this.knex("provider").where("id", providerId).update({
      photo_url: null,
      updated_at: getCurrentDateTime(),
    });

    if (provider?.photoUrl) {
      // TODO: Implement file deletion functionality
      console.log("Deleting provider photo:", provider.photoUrl);
    }
  }
}
