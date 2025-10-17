import dotenv from "dotenv/config";
import knex from "knex";

const dbconf = {
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3307,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'pruebacompufax',
    }
}

export const dbConn = knex( dbconf );
