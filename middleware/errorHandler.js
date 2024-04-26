exports.globalErrorHandler = (err, req, res, next) => {
    if(process.env.NODE_ENV === 'development'){
        
        ForDevelopmentMode(err, res);
    }
    else {
         ForProductionMode(err, res);
    }
    
}


const ForDevelopmentMode = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
    });
}

const ForProductionMode = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
}