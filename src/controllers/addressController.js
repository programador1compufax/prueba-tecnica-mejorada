import addressService from '../services/addressService.js';
import { SuccessResponse } from '../utils/response.js';
import addressValidators from '../validators/addressValidator.js';

class DireccionController {
    
    async getAllAddresses(req, res, next) {
        try {
            const result = await addressService.getAllAddresses();
            
            const response = new SuccessResponse(
                result,
                'Direcciones obtenidas exitosamente',
                200
            );
            
            return response.send(res);

        } catch (error) {
            next(error);
        }
    }
    
    async updateAddress(req, res, next){
        try {
            const { id } = req.query;
            const addressData = req.body;

            const validId = await addressValidators.validateId(id);
            const validData = await addressValidators.validateAddressData(addressData);

            const addressToUpdate = await addressService.getAddressById(validId);

            if( !addressToUpdate ){
                return res.status(404).json({
                    success: false,
                    message: 'Dirección no encontrada'
                });
            }
            
            const updatedAddress = await addressService.updateAddress(id, validData);
            
            const response = new SuccessResponse(
                updatedAddress,
                'Dirección actualizada exitosamente',
                200
            );
            
            return response.send(res);

        } catch (error) {
            next(error);
        }
    }
}
export default new DireccionController();