
export const errorHandler = (err, req, res, next) => {
  if(!err.isOperational){
    console.error("Unexpected Error:", err);
  }
  err.statusCode = err.statusCode || 500;
  const message = err.isOperational
    ? err.message
    : "Something went wrong";

  res.status(err.statusCode).json({
    statusCode: err.statusCode,
    message: message
  });
};

