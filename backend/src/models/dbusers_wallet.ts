import {db} from "./db";
import moment from "moment/moment";
import {ReturnWithData} from "../functions/constant_types";

export class dbusers_wallet extends db {
  constructor() {
    super();
    this.table = "users_wallet";
  }

  async listUsersWallets(user_id : number) {
    let return_data: ReturnWithData = {
      data: [],
      error: true,
      message: ""
    }

    this.where = ` WHERE user_id = ${user_id}`;
    let result : object[] = await this.listRecords();

    return_data = {
      error: false,
      message: "Success",
      data: result
    };

    return return_data;
  }
  async assignDefaultAccount(user_id: number) {

    let data: {
      user_id: number,
      wallet_type: string,
      wallet_account_name: string,
      balance: number,
      created_at: string,
      updated_at: string
    }[] = [{
      user_id: user_id,
      wallet_type: "Cash",
      wallet_account_name: "Cash",
      balance: 0,
      created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
    }, {
      user_id: user_id,
      wallet_type: "UPI",
      wallet_account_name: "UPI",
      balance: 0,
      created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
    }, {
      user_id: user_id,
      wallet_type: "Bank",
      wallet_account_name: "Bank",
      balance: 0,
      created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
    }];

    for (let index = 0; index < data.length; index++) {
      await this.insert(data[index]);
    }
  }
}
