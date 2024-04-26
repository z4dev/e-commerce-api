class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'; // for example 400-499 is a fail status code , 500is an error status code
        this.isOperational = true; // this is used to check if the error is operational or not
    }

}

module.exports = ApiError;