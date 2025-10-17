import { dbConn } from "../db/db.js";
import folioGenerator from "../utils/folioGenerator.js";

class OrderService{

    async createOrder(orderData){
        const { cliente_id, items } = orderData;
        const folio = folioGenerator.generate();
        
        try {
            for(const item of items){
                item.cliente_id = cliente_id;
                item.folio = folio;
                item.fecha_pedido = new Date();
            }

            await dbConn('ordenes').insert( items );
            
            return { folio };

        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
    
    async getAllOrders(){
        try {
            const orders = await dbConn('ordenes').select().orderBy('fecha_pedido', 'desc');
            return orders;

        } catch (error) {
            console.error('Error:', error);
            throw error;
            
        }
    }

    async getOrdersUser( id ){
        try {
            const orders = await dbConn('ordenes').select().where('cliente_id', id).orderBy('id', 'asc');
            return orders;

        } catch (error) {
            console.error('Error:', error);
            throw error;
            
        }
    }

    async getOrdersByFolio( folio ){
        try {
            const orders = await dbConn('ordenes').select().where('folio', folio);

            if (orders.length == 0) return null;

            return orders;

        } catch (error) {
            console.error('Error:', error);
            throw error;
            
        }
    }
}
export default new OrderService();