import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  UseGuards,
  Req,
} from "@nestjs/common";
import { ApiTags, ApiResponse, ApiParam, ApiQuery } from "@nestjs/swagger";
import { ProviderService } from "./provider.service";
import {
  ProviderResponse,
  Provider,
  CreateProviderDto,
  UpdateProviderDto,
  ProviderFilters,
} from "./provider.types";
import { ApiResponse as ApiResponseType } from "../../types";
import { JwtAuthGuard } from "../../utils/guards/auth.guard";
import { UserPolicyGuard } from "../../utils/guards/user.policy.guard";
import { AdminGuard } from "../../utils/guards/admin.guard";

@ApiTags("Providers")
@Controller()
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Get("provider")
  @ApiQuery({ name: "search-term", required: false }) // Query params for the API
  @ApiQuery({ name: "profession", required: false })
  @ApiQuery({ name: "city", required: false })
  @ApiQuery({ name: "town", required: false })
  @ApiQuery({ name: "specialization", required: false })
  @ApiQuery({ name: "rating", required: false })
  @ApiQuery({ name: "experience", required: false })
  @ApiResponse({ status: 200, type: ProviderResponse })
  async getAllProviders(
    @Query("search-term") searchTerm?: string,
    @Query("profession") profession?: string,
    @Query("city") city?: string,
    @Query("town") town?: string,
    @Query("specialization") specialization?: string,
    @Query("rating") rating?: number,
    @Query("experience") experience?: number,
  ): Promise<ApiResponseType<ProviderResponse>> {
    const filters: ProviderFilters = {
      searchTerm,
      profession,
      city,
      town,
      specialization,
      rating,
      experience,
    };

    return {
      data: await this.providerService.getAllProviders(filters),
    };
  }

  @Get("provider/:id")
  @ApiResponse({ status: 200, type: Provider })
  async getProviderById(
    @Param("id") id: string,
  ): Promise<ApiResponseType<Provider | null>> {
    const provider = await this.providerService.getProviderById(id);
    return {
      data: provider,
    };
  }

  @Get("provider/me")
  @UseGuards(JwtAuthGuard, UserPolicyGuard) // Bind customer id and provider id to the user
  @ApiResponse({ status: 200, type: Provider })
  async getMe(@Req() req: any): Promise<ApiResponseType<Provider | null>> {
    const provider = await this.providerService.getProviderById(
      req.user.providerId, // query only to get by the provider id
    );
    return {
      data: provider,
    };
  }

  @Delete("provider/:id")
  @UseGuards(JwtAuthGuard, AdminGuard) // Only admin can query by ID
  @ApiParam({ name: "id" })
  @ApiResponse({ status: 200 })
  async deleteProvider(
    @Param("id") id: string,
  ): Promise<ApiResponseType<void>> {
    await this.providerService.deleteProvider(id);
    return {
      data: undefined,
      message: "Provider deleted successfully",
    };
  }

  @Patch("provider/me")
  @UseGuards(JwtAuthGuard, UserPolicyGuard)
  @ApiResponse({ status: 200, type: Provider })
  async updateProvider(
    @Req() req: any,
    @Body() updateProviderDto: UpdateProviderDto,
  ): Promise<ApiResponseType<Provider>> {
    return {
      data: await this.providerService.updateProvider(
        req.user.providerId,
        updateProviderDto,
      ),
    };
  }

  @Post("provider")
  @ApiResponse({ status: 201, type: Provider })
  @UseGuards(JwtAuthGuard, UserPolicyGuard)
  async createProvider(
    @Body() createProviderDto: CreateProviderDto,
    @Req() req: any,
  ) {
    return {
      data: await this.providerService.createProvider(
        createProviderDto,
        req.user.id,
      ),
    };
  }

  @Delete("provider/:id/photo") // Strict REST standards
  @UseGuards(JwtAuthGuard, UserPolicyGuard)
  @ApiParam({ name: "id" })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404 })
  async deleteProviderPhoto(
    @Param("id") providerId: string,
  ): Promise<ApiResponseType<void>> {
    await this.providerService.deleteProviderPhoto(providerId);
    return {
      data: undefined,
    };
  }
}
