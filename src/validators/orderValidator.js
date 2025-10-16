import { ErrorResponse }  from '../utils/response.js';

class OrderValidator{
    validateCreateOrder(data) {
        const errors = [];

        if (!data.cliente_id) {
            errors.push({ field: 'cliente_id', message: 'El ID del cliente es requerido' });
        } else if (typeof data.cliente_id !== 'number' || !Number.isInteger(data.cliente_id)) {
            errors.push({ field: 'cliente_id', message: 'El ID del cliente debe ser un número entero' });
        } else if (data.cliente_id <= 0) {
            errors.push({ field: 'cliente_id', message: 'El ID del cliente debe ser mayor a 0' });
        }

        if (!data.items) {
            errors.push({ field: 'items', message: 'El arreglo de items es requerido' });
        } else if (!Array.isArray(data.items)) {
            errors.push({ field: 'items', message: 'Items debe ser un arreglo' });
        } else if (data.items.length === 0) {
            errors.push({ field: 'items', message: 'Debe incluir al menos un item' });
        } else {

            data.items.forEach((item, index) => {
                if (!item.producto) {
                    errors.push({ 
                        field: `items[${index}].producto`, 
                        message: `El producto es requerido en el item ${index + 1}` 
                    });
                } else if (typeof item.producto !== 'string') {
                    errors.push({ 
                        field: `items[${index}].producto`, 
                        message: `El producto debe ser un texto en el item ${index + 1}` 
                    });
                } else if (item.producto.trim().length < 3) {
                    errors.push({ 
                        field: `items[${index}].producto`, 
                        message: `El producto debe tener al menos 3 caracteres en el item ${index + 1}` 
                    });
                }

                if (!item.cantidad) {
                    errors.push({ 
                        field: `items[${index}].cantidad`, 
                        message: `La cantidad es requerida en el item ${index + 1}` 
                    });
                } else if (typeof item.cantidad !== 'number' || !Number.isInteger(item.cantidad)) {
                    errors.push({ 
                        field: `items[${index}].cantidad`, 
                        message: `La cantidad debe ser un número entero en el item ${index + 1}` 
                    });
                } else if (item.cantidad <= 0) {
                    errors.push({ 
                        field: `items[${index}].cantidad`, 
                        message: `La cantidad debe ser mayor a 0 en el item ${index + 1}` 
                    });
                }
            });
        }

        if (errors.length > 0) {
            throw new ErrorResponse('Errores de validación', 400, errors);
        }

        return {
            cliente_id: data.cliente_id,
            items: data.items.map(item => ({
            producto: item.producto.trim(),
            cantidad: item.cantidad
            }))
        };
    }

    validateId(id) {
        const numId = parseInt(id);
        if (!id || isNaN(numId) || numId <= 0) {
            throw new ErrorResponse('ID inválido', 400);
        }
        return numId;
    }
    
    validateFolio(folio) {
        if (!folio || typeof folio !== 'string') {
            throw new ErrorResponse('Folio inválido', 400);
        }
        
        const folioTrimmed = folio.trim().toUpperCase();

        const folioRegex = /^TEST[A-Z0-9]{6}$/;
        if (!folioRegex.test(folioTrimmed)) {
            throw new ErrorResponse('El folio debe tener el formato TEST seguido de 6 caracteres alfanuméricos', 400);
        }

        return folioTrimmed;
    }
}

export default new OrderValidator();