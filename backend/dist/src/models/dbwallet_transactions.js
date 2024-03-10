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
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbwallet_transactions = void 0;
const db_1 = require("./db");
class dbwallet_transactions extends db_1.db {
    constructor() {
        super();
        this.table = "user_transactions";
    }
    getMonthlyIncomeExpense(user_id, get_income, get_expense, get_both) {
        return __awaiter(this, void 0, void 0, function* () {
            let return_data = {
                data: [],
                error: true,
                message: ""
            };
            this.where = ` WHERE user_id = ${user_id} GROUP BY transaction_type, "month", "year"`;
            this.orderBy = ` ORDER BY "month", "year", transaction_type`;
            let fields = " EXTRACT(MONTH FROM transaction_date) AS \"month\", EXTRACT(YEAR FROM transaction_date) AS \"year\", SUM(amount) AS amount, transaction_type ";
            let result = yield this.allRecords(fields);
            if (!result.length) {
                return_data.error = false;
                return_data.data = [];
                return_data.message = "records_not_found";
            }
            return_data.error = false;
            return_data.message = "SUCCESS";
            return_data.data = result;
            return return_data;
        });
    }
}
exports.dbwallet_transactions = dbwallet_transactions;
