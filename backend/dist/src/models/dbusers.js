"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbusers = void 0;
const db_1 = require("./db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const moment_1 = __importDefault(require("moment/moment"));
const dbusers_wallet_1 = require("./dbusers_wallet");
class dbusers extends db_1.db {
    constructor() {
        super();
        this.table = "users";
    }
    //User Login
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let return_data = {
                data: [],
                error: true,
                message: ""
            };
            this.where = " WHERE email = '" + email + "'";
            let fields = "id, first_name, last_name, password, mobile, email, is_active, created_date";
            let result = yield this.selectOne(fields);
            if (!result || result.length == 0) {
                return_data.message = "User_Not_Found";
                return return_data;
            }
            const comparePassword = yield bcrypt_1.default.compare(password, result[0].password);
            if (!comparePassword) {
                return_data.message = "Unauthorized_Access";
                return return_data;
            }
            //update last_login
            yield this.update_last_login(result[0].id, (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'));
            let return_result = {
                first_name: result[0].first_name,
                last_name: result[0].last_name,
                mobile: result[0].mobile,
                email: result[0].email,
                is_active: result[0].is_active,
                created_date: result[0].created_date
            };
            return_data = {
                error: false,
                message: "Success",
                data: [return_result]
            };
            return return_data;
        });
    }
    //Update last_login on every login
    update_last_login(user_id, date) {
        return __awaiter(this, void 0, void 0, function* () {
            this.where = ` WHERE id = '${user_id}'`;
            let result = yield this.updateOne({ last_login: date });
        });
    }
    //User Sign Up
    signup(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let return_data = {
                data: [],
                error: true,
                message: ""
            };
            let result = yield this.insert(data);
            if (!result || result.length == 0) {
                return_data.message = "User_Not_Found";
                return return_data;
            }
            console.log("User ID : ", result[0].id);
            let dbwallet_accountObj = new dbusers_wallet_1.dbusers_wallet();
            let createDefaultWallet = yield dbwallet_accountObj.assignDefaultAccount(result[0].id);
            let return_result = {
                first_name: result[0].first_name,
                last_name: result[0].last_name,
                mobile: result[0].mobile,
                email: result[0].email,
                is_active: result[0].is_active,
                created_date: result[0].created_date
            };
            return_data = {
                error: false,
                message: "Success",
                data: [return_result]
            };
            return return_data;
        });
    }
}
exports.dbusers = dbusers;
