import { pool } from "../db/db.js";

class ClientService {
    
    async getAllClients() {
        const sql = `SELECT id, nombre, apellido, edad, email
                            FROM clientes
                            ORDER BY id ASC;`;
        let conn;

        try {
            conn = await pool.getConnection();
            const [clients] = await conn.query(sql);
            return clients;

        } catch (error) {
            console.error('Error:', error);
            throw error;

        } finally {
            if (conn) conn.release();
        }
    }

    async getClientById( id ){
        const sql = `SELECT id, nombre, apellido, edad, email
                        FROM clientes
                        WHERE id = ${id} LIMIT 1;`;                     
        let conn;

        try {
            conn = await pool.getConnection();
            const [rows] = await conn.query(sql);

            if (rows.length == 0) return null;

            return rows[0];

        } catch (error) {
            console.error('Error:', error);
            throw error;

        } finally {
            if (conn) conn.release();
        }        
    }

    async createClient( clientData ){
        const {nombre, apellido, edad, email} = clientData;
        const sql = `INSERT INTO clientes (nombre, apellido, edad, email, fecha_registro)
                        VALUES (?, ?, ?, ?, ?);`;                
        let conn;

        try {
            conn = await pool.getConnection();
            const [result] = await conn.execute(sql, [nombre, apellido, edad, email, new Date()]);
            const newId = result.insertId;
            const newCliente = await this.getClientById(newId);
            return newCliente;

        } catch (error) {
            console.error('Error:', error);
            throw error;

        } finally {
            if (conn) conn.release();
        }
    }

}
export default new ClientService();