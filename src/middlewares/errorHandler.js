const errorHandler = (err, req, res, next) => {
    console.error('Error:', {
        message: err.message,
        stack: err.stack,
        url: req.originalUrl,
        method: req.method,
        timestamp: new Date().toISOString()
    });

    const statusCode = err.statusCode || 500;
    
    const errorResponse = {
        success: false,
        message: err.message || 'Error interno del servidor',
        ...(err.errors && { errors: err.errors })
    };
  
    if (process.env.NODE_ENV === 'development') {
        errorResponse.stack = err.stack;
    }
    
    res.status(statusCode).json(errorResponse);
};
  
export default errorHandler;