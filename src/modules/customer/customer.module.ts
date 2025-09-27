import { Module } from "@nestjs/common";
import { CustomerService } from "@/modules/customer/customer.service";
import { CustomerController } from "@/modules/customer/customer.controller";
import { UsersService } from "../user/user.service";

@Module({
  providers: [CustomerService, UsersService],
  controllers: [CustomerController],
  exports: [CustomerService],
})
export class CustomerModule {}
