export class SuccessResponse {
    constructor(data, message = 'Operación exitosa', statusCode = 200) {
        this.success = true;
        this.message = message;
        this.data = data;
        this.statusCode = statusCode;
    }

    send(res) {
        return res.status(this.statusCode).json({
            success: this.success,
            message: this.message,
            data: this.data
        });
    }
}

export class ErrorResponse extends Error {
    constructor(message, statusCode = 500, errors = null) {
        super(message);
        this.success = false;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}
