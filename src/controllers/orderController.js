import orderService from "../services/orderService.js";
import { SuccessResponse, ErrorResponse } from "../utils/response.js";
import orderValidator from "../validators/orderValidator.js";
import clientService from "../services/clientService.js";
import clientValidator from "../validators/clientValidator.js";

class OrderController{

    async createOrder(req, res, next){
        try {
            const orderData = req.body;
            const validatedData = await orderValidator.validateCreateOrder(orderData);

            const client = await clientService.getClientById(validatedData.cliente_id);
            if( !client ){
                return res.status(404).json({
                    success: false,
                    message: 'Cliente no encontrado'
                });
            }

            const result = await orderService.createOrder(orderData);
            
            const response = new SuccessResponse(
                result,
                'Orden creada exitosamente',
                201
            );
            
            return response.send(res);

        } catch (error) {
            next(error);
        }
        
    }

    async getAllOrders(req, res, next){
        try {
            const result = await orderService.getAllOrders();
            
            const response = new SuccessResponse(
                result,
                'Órdenes obtenidas exitosamente',
                200
            );
            
            return response.send(res);

        } catch (error) {
            next(error);
        }
    }

    async getOrdersUser(req, res, next){
        try {
            const { clientId } = req.params;
            const validClientId = clientValidator.validateId(clientId);

            const client = await clientService.getClientById(validClientId);
            if( !client ){
                return res.status(404).json({
                    success: false,
                    message: 'Cliente no encontrado'
                });
            }

            const orders = await orderService.getOrdersUser(validClientId);
            
            const response = new SuccessResponse(
                orders,
                'Órdenes obtenidas exitosamente',
                200
            );
            
            return response.send(res);

        } catch (error) {
            next(error);
        }
    }
    
    async getOrdersByFolio(req, res, next){
        try {
            const { folio } = req.params;
            const validFolio = await orderValidator.validateFolio(folio);

            const orders = await orderService.getOrdersByFolio(validFolio);

            if( !orders ){
                return res.status(404).json({
                    success: false,
                    message: 'Folio no encontrado'
                });
            }
            
            const response = new SuccessResponse(
                orders,
                'Órdenes obtenidas exitosamente',
                200
            );
            
            return response.send(res);

        } catch (error) {
            next(error);
        }
    }
}
export default new OrderController();