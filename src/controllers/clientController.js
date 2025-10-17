import clientService from "../services/clientService.js";
import { SuccessResponse } from '../utils/response.js';
import clientValidator from "../validators/clientValidator.js";

class ClientController {

    async getAllClients(req, res, next) {
        try {
            const result = await clientService.getAllClients();
            
            const response = new SuccessResponse(
                result,
                'Clientes obtenidos exitosamente',
                200
            );
            
            return response.send(res);

        } catch (error) {
            next(error);
        }
    }

    async getClientById(req, res, next) {
        try {
            const { id } = req.params;
            const validId = await clientValidator.validateId(id);

            const client = await clientService.getClientById(validId);

            if( !client ){
                return res.status(404).json({
                    success: false,
                    message: 'Cliente no encontrado'
                });
            }
            
            const response = new SuccessResponse(
                client,
                'Cliente obtenido exitosamente',
                200
            );
            
            return response.send(res);

        } catch (error) {
            next(error);
        }
    }

    async createClient(req, res, next) {
        try {
            const clientData = req.body;
            const validData = await clientValidator.validateCreateClient(clientData);
            const newClient = await clientService.createClient(validData);

            const response = new SuccessResponse(
                newClient,
                'Cliente creado exitosamente',
                201
            );
            
            return response.send(res);

        } catch (error) {
            next(error);
        }
    }
}

export default new ClientController();