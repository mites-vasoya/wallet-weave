import {db} from "./db";
import bcrypt from "bcrypt";
import {ReturnWithData} from "../functions/constant_types";
import moment from "moment/moment";

export class dbusers extends db {
  constructor() {
    super();
    this.table = "users";
  }

  //User Login
  async login(email: string, password: string) {
    let return_data: ReturnWithData = {
      data: [],
      error: true,
      message: ""
    }

    this.where = " WHERE email = '" + email + "'";
    let fields = "id, first_name, last_name, password, mobile, email, is_active, created_date"
    let result = await this.selectOne(fields);

    if (!result || result.length == 0) {
      return_data.message = "User_Not_Found";
      return return_data;
    }

    const comparePassword = await bcrypt.compare(password, result[0].password);

    if (!comparePassword) {
      return_data.message = "Unauthorized_Access";
      return return_data;
    }

    //update last_login
    await this.update_last_login(result[0].id, moment().format('YYYY-MM-DD HH:mm:ss'));

    let return_result: any = {
      first_name: result[0].first_name,
      last_name: result[0].last_name,
      mobile: result[0].mobile,
      email: result[0].email,
      is_active: result[0].is_active,
      created_date: result[0].created_date
    }

    return_data = {
      error: false,
      message: "Success",
      data: [return_result]
    };

    return return_data;
  }

  //Update last_login on every login
  async update_last_login(user_id : number, date : string) {
    this.where = ` WHERE id = '${user_id}'`;
    let result : any = await this.updateOne({last_login : date})
  }

  //User Sign Up
  async signup(data : object) {
    let return_data: ReturnWithData = {
      data: [],
      error: true,
      message: ""
    }

    let result = await this.insert(data);

    if (!result || result.length == 0) {
      return_data.message = "User_Not_Found";
      return return_data;
    }

    let return_result: any = {
      first_name: result[0].first_name,
      last_name: result[0].last_name,
      mobile: result[0].mobile,
      email: result[0].email,
      is_active: result[0].is_active,
      created_date: result[0].created_date
    }

    return_data = {
      error: false,
      message: "Success",
      data: [return_result]
    };

    return return_data;
  }
}
