import { ErrorResponse }  from '../utils/response.js';
import Joi from 'joi';

class OrderValidator{

    async validateCreateOrder(data) {
        const itemSchema = Joi.object({
            producto: Joi.string()
                        .trim()
                        .min(3)
                        .required(),
            
            cantidad: Joi.number()
                        .integer()
                        .positive()
                        .required()
        });
        const orderSchema = Joi.object({
            cliente_id: Joi.number()
                            .positive()
                            .required(),
            
            items: Joi.array()
                    .min(2)
                    .items( itemSchema )
                    .required()
        });

        try {
            const result = await orderSchema.validateAsync( data );
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
    
    async validateFolio(folio) {
        const folioTrimmed = folio.trim().toUpperCase();
        const folioRegex = /^TEST[A-Z0-9]{6}$/;
        const folioSchema = Joi.string().trim().regex(folioRegex).required();

        try {
            const result = await folioSchema.validateAsync( folioTrimmed );
            return result;
            
        } catch (error) {
            const errorMessage = { message: error.message  };
            throw new ErrorResponse('Errores de validación', 400, errorMessage);
        }
    }
}

export default new OrderValidator();