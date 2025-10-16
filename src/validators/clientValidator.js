import { ErrorResponse }  from '../utils/response.js';

class ClientValidator {
  
  validateCreateClient(data) {
    const errors = [];

    if (!data.nombre || typeof data.nombre !== 'string') {
      errors.push({ field: 'nombre', message: 'El nombre es requerido y debe ser un texto' });
    }

    if (!data.apellido || typeof data.apellido !== 'string') {
      errors.push({ field: 'apellido', message: 'El apellido es requerido y debe ser un texto' });
    }

    if (!data.edad) {
      errors.push({ field: 'edad', message: 'La edad es requerida' });
    } else if (typeof data.edad !== 'number' || !Number.isInteger(data.edad)) {
      errors.push({ field: 'edad', message: 'La edad debe ser un número entero' });
    } else if (data.edad < 18 || data.edad > 120) {
      errors.push({ field: 'edad', message: 'La edad debe estar entre 18 y 120 años' });
    }

    if (!data.email || typeof data.email !== 'string') {
      errors.push({ field: 'email', message: 'El email es requerido y debe ser un texto' });
    } else if (!this.isValidEmail(data.email)) {
      errors.push({ field: 'email', message: 'El formato del email no es válido' });
    }

    if (errors.length > 0) {
      throw new ErrorResponse('Errores de validación', 400, errors);
    }

    return {
      nombre: data.nombre.trim(),
      apellido: data.apellido.trim(),
      edad: data.edad,
      email: data.email.trim().toLowerCase()
    };
  }

  validateId(id) {
    const numId = parseInt(id);
    if (!id || isNaN(numId) || numId <= 0) {
      throw new ErrorResponse('ID inválido', 400);
    }
    return numId;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
export default new ClientValidator();