import { Pool } from 'pg';

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

    async selectOne(fields : string = "*", where : string = "") {
        let query = "SELECT " + fields + "FROM " + this.table + where
        let result = await pool.query(query);
        
        if(!result.rowCount) {
            return [];
        } 
        return result.rows;
    }
}