import { Pool } from 'pg';
import {object} from "joi";

const pool = new Pool({
    user: 'mitesh',
    host: 'localhost',
    database: 'walletweave',
    password: 'root',
    port: 5432, // Default PostgreSQL port
  });

export class db {
    constructor() {
    }

    table : string = "";
    query : string = "";
    where : string = "";

    async insert(data : object) {
        let colArray = Object.keys(data);
        let dataArray = Object.values(data);
        let query : string = `INSERT INTO ${this.table} (${colArray.join(', ')}) VALUES (${dataArray.map((_, index) => `$${index + 1}`).join(', ')}) RETURNING *`;
        let result = await pool.query(query, dataArray);

        if(!result.rowCount) {
            return [];
        }
        return result.rows;
    }

    async selectOne(fields : string = "*") {
        this.query = "SELECT " + fields + " FROM " + this.table + this.where;
        let result = await pool.query(this.query);

        if(!result.rowCount) {
            return [];
        }
        return result.rows;
    }

    async update() {
      let result = await pool.query(this.query);

      if(!result.rowCount) return 0;

      return result.rowCount;
    }

    async updateOne(data : object) {
     this.query = `UPDATE ${this.table} SET ${Object.keys(data)} = '${Object.values(data)}' ${this.where}`;
      let result : number = await this.update();

      console.log("Query : ", this.query);
      console.log(result);
    }
}
