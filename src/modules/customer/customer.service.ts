import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectKnex } from "nestjs-knex";
import { Knex } from "knex";
import {
  Customer,
  CustomerResponse,
  CreateCustomerDto,
  UpdateCustomerDto,
  CustomerFilters,
} from "./customer.types";
import { applyDynamicFilters } from "../query.utils";
import { getCurrentDateTime, generateId } from "../../utils/iD.utils";
import { UsersService } from "../user/user.service";

@Injectable()
export class CustomerService {
  constructor(
    @InjectKnex() private readonly knex: Knex,
    private readonly usersService: UsersService,
  ) {}

  private camelToSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }

  async getAllCustomers(filters?: CustomerFilters): Promise<CustomerResponse> {
    const query = this.knex("customer")
      .select("*")
      .modify((query) => {
        if (filters) {
          const filterMapping: Record<string, string> = {
            id: "id",
            userId: "user_id",
            name: "name",
            email: "email",
            status: "status",
            phone: "phone",
            serviceKeywords: "service_keywords",
          };

          applyDynamicFilters(query, filters, filterMapping);
        }
      })
      .orderBy("created_at", "desc");

    const customers = await query;

    return { customers };
  }

  async getCustomerById(id: string): Promise<Customer | null> {
    const customer = await this.knex("customer").where("id", id).first();

    return customer ? this.transformToCustomer(customer) : null;
  }

  async getCustomerByUserId(customerId: string): Promise<Customer | null> {
    if (!customerId) {
      return null;
    }

    const customer = await this.knex("customer")
      .where("id", customerId)
      .first();

    return customer ? this.transformToCustomer(customer) : null;
  }

  async getCustomerByAuth0Id(auth0Id: string): Promise<Customer | null> {
    const user = await this.knex("user").where("auth0Id", auth0Id).first();

    if (!user) {
      return null;
    }

    return this.getCustomerByUserId(user.id);
  }

  async createCustomer(
    createCustomerDto: CreateCustomerDto,
    userId: string,
  ): Promise<Customer> {
    const user = await this.usersService.getUserById(userId);

    const [customer] = await this.knex("customer")
      .insert({
        id: generateId("CUST"),
        user_id: userId,
        name: createCustomerDto?.name,
        email: user?.email,
        phone: createCustomerDto?.phone,
        address: createCustomerDto?.address,
        service_keywords: createCustomerDto?.serviceKeywords,
        status: "active",
        registration_date: getCurrentDateTime(),
        created_at: getCurrentDateTime(),
      })
      .returning("*");

    return this.transformToCustomer(customer);
  }

  async updateCustomer(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    const allowedFields = [
      "userId",
      "name",
      "email",
      "phone",
      "address",
      "serviceKeywords",
    ];

    const updateData: Record<string, any> = {
      updated_at: getCurrentDateTime(),
    };

    for (const field of allowedFields) {
      if (updateCustomerDto[field as keyof UpdateCustomerDto] !== undefined) {
        const dbField = this.camelToSnakeCase(field);
        updateData[dbField] =
          updateCustomerDto[field as keyof UpdateCustomerDto];
      }
    }

    const [updatedCustomer] = await this.knex("customer")
      .where("id", id)
      .update(updateData)
      .returning("*");

    if (!updatedCustomer) {
      throw new NotFoundException("Customer not found");
    }

    return this.transformToCustomer(updatedCustomer);
  }

  async deleteCustomer(id: string): Promise<void> {
    const deletedCount = await this.knex("customer").where("id", id).del();

    if (deletedCount === 0) {
      throw new NotFoundException("Customer not found");
    }
  }

  private transformToCustomer(dbRow: any): Customer {
    return {
      id: dbRow.id,
      userId: dbRow.user_id,
      name: dbRow.name,
      email: dbRow.email,
      phone: dbRow.phone,
      address: dbRow.address,
      status: dbRow.status,
      registrationDate: dbRow.registration_date,
      totalRequests: dbRow.total_requests,
      rating: dbRow.rating,
      verified: dbRow.verified,
      serviceKeywords: dbRow.service_keywords,
      createdAt: dbRow.created_at,
      updatedAt: dbRow.updated_at,
    };
  }
}
