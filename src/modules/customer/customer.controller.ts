import {
  Controller,
  Get,
  Post,
  Patch,
  Query,
  Body,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiResponse, ApiQuery } from "@nestjs/swagger";
import { CustomerService } from "@/modules/customer/customer.service";
import {
  CustomerResponse,
  Customer,
  CreateCustomerDto,
  UpdateCustomerDto,
  CustomerFilters,
} from "./customer.types";
import { ApiResponse as ApiResponseType } from "@/types";
import { JwtAuthGuard } from "@/utils/guards/auth.guard";
import { UserPolicyGuard } from "@/utils/guards/user.policy.guard";
import { AdminGuard } from "@/utils/guards/admin.guard";
@ApiTags("Customers")
@UseGuards(JwtAuthGuard)
@Controller("customer")
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @UseGuards(AdminGuard)
  @ApiQuery({ name: "id", required: false })
  @ApiQuery({ name: "name", required: false })
  @ApiQuery({ name: "email", required: false })
  @ApiQuery({ name: "status", required: false })
  @ApiQuery({ name: "phone", required: false })
  @ApiResponse({ status: 200, type: CustomerResponse })
  async getAllCustomers(
    @Query("id") id?: string,
    @Query("name") name?: string,
    @Query("email") email?: string,
    @Query("status") status?: string,
    @Query("phone") phone?: string,
  ): Promise<ApiResponseType<CustomerResponse>> {
    const filters: CustomerFilters = {
      id,
      name,
      email,
      status,
      phone,
    };

    return {
      data: await this.customerService.getAllCustomers(filters),
    };
  }

  @Get("me")
  @UseGuards(UserPolicyGuard)
  @ApiResponse({ status: 200, type: Customer })
  async getMe(@Req() req: any): Promise<ApiResponseType<Customer | null>> {
    const customer = await this.customerService.getCustomerByUserId(
      req.user.customerId,
    );
    return {
      data: customer,
    };
  }

  @Patch("me")
  @UseGuards(UserPolicyGuard)
  @ApiResponse({ status: 200, type: Customer })
  async updateCustomer(
    @Body() updateCustomerDto: UpdateCustomerDto,
    @Req() req: any,
  ): Promise<ApiResponseType<Customer>> {
    return {
      data: await this.customerService.updateCustomer(
        req.user.customerId,
        updateCustomerDto,
      ),
    };
  }

  @Post()
  @UseGuards(UserPolicyGuard)
  @ApiResponse({ status: 201, type: Customer }) // 201 because it creates a new resource.
  async createCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
    @Req() req: any,
  ): Promise<ApiResponseType<Customer>> {
    return {
      data: await this.customerService.createCustomer(
        createCustomerDto,
        req.user.id,
      ),
    };
  }
}
