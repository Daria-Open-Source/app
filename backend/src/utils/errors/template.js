class AppError extends Error {
    isOperational;

    constructor(message, isOperational = true) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
  }
}

export class WebError extends AppError {
    constructor(message, statusCode = 400) {  super(message); };
}

export class InfraError extends AppError {
    constructor(message, statusCode = 500) { super(message, false); };
}

export class DataError extends AppError {
    constructor(message, statusCode = 500) { super(message, false); };
}

export class DomainError extends AppError {
    constructor(message, statusCode = 500) { super(message, false); };
}