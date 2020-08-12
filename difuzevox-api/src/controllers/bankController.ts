import { Route, Get, Controller } from "tsoa";
import { Bank } from "../models/bank";
import { BankService } from "../services/bankService";

@Route("bank")
export class BankController extends Controller{
    @Get()
    public async getBankDetails(
    ): Promise<Bank> {
      const data = await new BankService().getBankDetails();
      return data;
    }
}