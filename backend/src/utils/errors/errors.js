import {
    WebError,
    InfraError,
    DomainError,
    DataError
} from './template.js';

// children for WebError
export class ValidationError extends WebError {
    constructor() {};
}

export class HttpError extends WebError {
    constructor() {};
}

export class AuthenticationError extends WebError {
    constructor() {};
}

export class AuthorizationError extends WebError {
    constructor() {};
}

// children of InfraError
export class BigQueryError extends InfraError {
    constructor(message) { super(message); }
}