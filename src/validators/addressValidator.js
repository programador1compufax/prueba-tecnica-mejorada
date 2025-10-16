import { ErrorResponse } from "../utils/response.js";

class AddressValidator {
  
  validateAddressData(data, isUpdate = false) {
    const errors = [];
    if (!isUpdate && !data.calle) {
      errors.push({ field: 'calle', message: 'La calle es requerida' });
    } else if (data.calle !== undefined) {
      if (typeof data.calle !== 'string') {
        errors.push({ field: 'calle', message: 'La calle debe ser un texto' });
      } else if (data.calle.trim().length < 3) {
        errors.push({ field: 'calle', message: 'La calle debe tener al menos 3 caracteres' });
      } else if (data.calle.trim().length > 200) {
        errors.push({ field: 'calle', message: 'La calle no puede exceder 200 caracteres' });
      }
    }

    if (!isUpdate && !data.ciudad) {
      errors.push({ field: 'ciudad', message: 'La ciudad es requerida' });
    } else if (data.ciudad !== undefined) {
      if (typeof data.ciudad !== 'string') {
        errors.push({ field: 'ciudad', message: 'La ciudad debe ser un texto' });
      } else if (data.ciudad.trim().length < 2) {
        errors.push({ field: 'ciudad', message: 'La ciudad debe tener al menos 2 caracteres' });
      } else if (data.ciudad.trim().length > 100) {
        errors.push({ field: 'ciudad', message: 'La ciudad no puede exceder 100 caracteres' });
      }
    }
    
    if (!isUpdate && !data.codigo_postal) {
      errors.push({ field: 'codigo_postal', message: 'El código postal es requerido' });
    } else if (data.codigo_postal !== undefined) {
      if (typeof data.codigo_postal !== 'string') {
        errors.push({ field: 'codigo_postal', message: 'El código postal debe ser un texto' });
      }
    }

    if (errors.length > 0) {
      throw new ErrorResponse('Errores de validación', 400, errors);
    }

    const cleanData = {};
    
    if (data.calle !== undefined) {
      cleanData.calle = data.calle.trim();
    }
    if (data.ciudad !== undefined) {
      cleanData.ciudad = data.ciudad.trim();
    }
    if (data.codigo_postal !== undefined) {
      cleanData.codigo_postal = data.codigo_postal.trim();
    }

    return cleanData;
  }

  validateId(id) {
    const numId = parseInt(id);
    if (!id || isNaN(numId) || numId <= 0) {
      throw new ErrorResponse('ID Dirección inválido', 400);
    }
    return numId;
  }
}
export default new AddressValidator();