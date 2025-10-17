import { ErrorResponse } from "../utils/response.js";
import Joi from "joi";

class AddressValidator {
  
  async validateAddressData(data) {
    const addressSchema = Joi.object({
      calle: Joi.string().trim().min(3).max(200),
      ciudad: Joi.string().trim().min(2).max(100),
      codigo_postal: Joi.string().trim().max(20)
    });

    try {
      const result = addressSchema.validateAsync( data );
      return result;

    } catch (error) {
      const errorMessage = { message: error.message  };
      throw new ErrorResponse('Errores de validación', 400, errorMessage);
    }
  }

  async validateId(id) {
    const idSchema = Joi.number().integer().positive().required();
    
    try {
      const result = await idSchema.validateAsync( id );
      return result;
        
    } catch (error) {
      const errorMessage = { message: error.message  };
      throw new ErrorResponse('Errores de validación', 400, errorMessage);
    }
  }
}
export default new AddressValidator();