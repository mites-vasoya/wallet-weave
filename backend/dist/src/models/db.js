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
exports.db = void 0;
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: 'mitesh',
    host: 'localhost',
    database: 'walletweave',
    password: 'root',
    port: 5432, // Default PostgreSQL port
});
class db {
    constructor() {
        this.table = "";
        this.query = "";
        this.where = "";
        this.limit = "";
        this.offset = "";
        this.orderBy = "";
    }
    insert(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let colArray = Object.keys(data);
            let dataArray = Object.values(data);
            console.log("Data Array : ", dataArray);
            let query = `INSERT INTO ${this.table} (${colArray.join(', ')}) VALUES (${dataArray.map((_, index) => `$${index + 1}`).join(', ')}) RETURNING *`;
            let result = yield pool.query(query, dataArray);
            console.log("Query : ", dataArray);
            if (!result.rowCount) {
                return [];
            }
            return result.rows;
        });
    }
    selectOne(fields = "*") {
        return __awaiter(this, void 0, void 0, function* () {
            this.query = "SELECT " + fields + " FROM " + this.table + this.where;
            let result = yield pool.query(this.query);
            if (!result.rowCount) {
                return [];
            }
            return result.rows;
        });
    }
    listRecords(fields = "*") {
        return __awaiter(this, void 0, void 0, function* () {
            this.query = "SELECT " + fields + " FROM " + this.table + this.where + this.orderBy + this.limit + this.offset;
            console.log("Query : ", this.query);
            let result = yield pool.query(this.query);
            if (!result.rowCount) {
                return [];
            }
            return result.rows;
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield pool.query(this.query);
            if (!result.rowCount)
                return 0;
            return result.rowCount;
        });
    }
    updateOne(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.query = `UPDATE ${this.table} SET ${Object.keys(data)} = '${Object.values(data)}' ${this.where}`;
            let result = yield this.update();
            console.log("Query : ", this.query);
            console.log(result);
        });
    }
}
exports.db = db;
