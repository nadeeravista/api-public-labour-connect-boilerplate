import { Module } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { CustomerController } from "./customer.controller";
import { UsersService } from "../user/user.service";

@Module({
  providers: [CustomerService, UsersService],
  controllers: [CustomerController],
  exports: [CustomerService],
})
export class CustomerModule {}
