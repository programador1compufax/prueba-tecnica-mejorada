import { ErrorResponse }  from '../utils/response.js';
import Joi from 'joi';

class ClientValidator {
  
  async validateCreateClient(data) {
    const clientSchema = Joi.object({
      nombre: Joi.string().trim().required(),
      apellido: Joi.string().trim().required(),
      edad: Joi.number().integer().min(18).max(120).required(),
      email: Joi.string().trim().email()
    });

    try {
      const result = await clientSchema.validateAsync( data );
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
export default new ClientValidator();