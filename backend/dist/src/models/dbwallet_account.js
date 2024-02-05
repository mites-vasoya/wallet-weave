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
exports.dbwallet_account = void 0;
const db_1 = require("./db");
const moment_1 = __importDefault(require("moment/moment"));
class dbwallet_account extends db_1.db {
    constructor() {
        super();
        this.table = "users_wallet";
    }
    assignDefaultAccount(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("assigning default account : ", user_id);
            let data = [{
                    user_id: user_id,
                    wallet_type: "Cash",
                    wallet_account_name: "Cash",
                    balance: 0,
                    created_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
                    updated_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')
                }, {
                    user_id: user_id,
                    wallet_type: "UPI",
                    wallet_account_name: "UPI",
                    balance: 0,
                    created_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
                    updated_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')
                }, {
                    user_id: user_id,
                    wallet_type: "Bank",
                    wallet_account_name: "Bank",
                    balance: 0,
                    created_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
                    updated_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')
                }];
            for (let index = 0; index < data.length; index++) {
                yield this.insert(data[index]);
            }
        });
    }
}
exports.dbwallet_account = dbwallet_account;
