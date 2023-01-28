import AppError from '../utils/appError';

export const globalErrorHandler = (err, request, response, next) => {
  let error = { ...err };
  console.log(error);
  console.log(error.name);
  console.log(err.name);
  error.message = err.message;
  if (error.name === 'PasswordLengthError') {
    return response.status(error.statusCode).json({
      message: error.message,
    });
  }
  if (error.name === 'ValidationError') {
    console.log('hello');
    response.status(error.statusCode).json({
      message: error.message,
    });
  }
};
