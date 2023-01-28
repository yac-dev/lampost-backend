class AppError extends Error {
  constructor(message, statusCode, name) {
    // errorのnameによって、どんなerrorを最終的に返すか、だよな。。。
    super(message);
    this.statusCode = statusCode;
    this.name = name;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
export default AppError;
