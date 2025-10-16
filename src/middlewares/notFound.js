import { ErrorResponse } from "../utils/response.js";

const notFound = (req, res, next) => {
    const error = new ErrorResponse(
        `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
        404
    );
    next(error);
}

export default notFound;