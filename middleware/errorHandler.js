//eslint-disable-next-line
const multer = require('multer');

const ForDevelopmentMode = (err, res) => {
    res.status(err.statusCode || 500).json({
        status: err.status || 'error',
        message: err.message,
        stack: err.stack,
    });
}

const ForProductionMode = (err, res) => {
    if (err instanceof multer.MulterError) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    } else {
        res.status(err.statusCode || 500).json({
            status: err.status || 'error',
            message: err.message
        });
    }
}

exports.globalErrorHandler = (err, req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        ForDevelopmentMode(err, res);
    } else {
        ForProductionMode(err, res);
    }
}
