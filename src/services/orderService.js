import { pool } from "../db/db.js";
import folioGenerator from "../utils/folioGenerator.js";

class OrderService{

    async createOrder(orderData){
        const { cliente_id, items } = orderData;
        const folio = folioGenerator.generate();

        const sql = `INSERT INTO ordenes (cliente_id, producto, cantidad, fecha_pedido, folio)
                        VALUES (?, ?, ?, ?, ?)`;
        let conn;
        
        try {
            conn = await pool.getConnection();

            for(const item of items){
                const { producto, cantidad } = item;
                await conn.execute(sql, [cliente_id, producto, cantidad, new Date(), folio]);
            }
            
            return { folio };

        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
    
    async getAllOrders(){
        const sql = `SELECT * FROM ordenes ORDER BY id ASC;`;
        let conn;

        try {
            conn = await pool.getConnection();
            const [orders] = await conn.query(sql);
            return orders;

        } catch (error) {
            console.error('Error:', error);
            throw error;
            
        } finally {
            if (conn) conn.release();
        }
    }

    async getOrdersUser( id ){
        const sql = `SELECT * FROM ordenes
                        WHERE cliente_id = ${id}
                        ORDER BY id ASC;`;
        let conn;

        try {
            conn = await pool.getConnection();
            const [orders] = await conn.query(sql);

            return orders;

        } catch (error) {
            console.error('Error:', error);
            throw error;
            
        } finally {
            if (conn) conn.release();
        }
    }

    async getOrdersByFolio( folio ){
        const sql = `SELECT * FROM ordenes
                        WHERE folio = '${folio}'
                        ORDER BY id ASC;`;
        let conn;

        try {
            conn = await pool.getConnection();
            const [orders] = await conn.query(sql);

            if (orders.length == 0) return null;

            return orders;

        } catch (error) {
            console.error('Error:', error);
            throw error;
            
        } finally {
            if (conn) conn.release();
        }
    }
}
export default new OrderService();