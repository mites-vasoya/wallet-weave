import {db} from "./db";
import {ReturnWithData} from "../functions/constant_types";

export class dbwallet_transactions extends db{
  constructor() {
    super();
    this.table = "user_transactions";
  }

  async getMonthlyIncomeExpense(user_id : number , get_income : boolean, get_expense : boolean, get_both : boolean) {
    let return_data: ReturnWithData = {
      data: [],
      error: true,
      message: ""
    }

    this.where = ` WHERE user_id = ${user_id} GROUP BY transaction_type, "month", "year"`;
    this.orderBy = ` ORDER BY "month", "year", transaction_type`;

    let fields : string = " EXTRACT(MONTH FROM transaction_date) AS \"month\", EXTRACT(YEAR FROM transaction_date) AS \"year\", SUM(amount) AS amount, transaction_type ";
    let result = await this.allRecords(fields);

    if(!result.length) {
      return_data.error = false;
      return_data.data = [];
      return_data.message = "records_not_found";
    }

    return_data.error = false;
    return_data.message = "SUCCESS";
    return_data.data = result;

    return return_data;
  }
}
