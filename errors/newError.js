const { StatusCodes } = require('http-status-codes');

class CustomError extends Error{
    status
    statusCode
    resource
    ty = ''
    //check StatusCodes for a possible error
    constructor(message, StatusCodes, resource){
        super(message)
        this.status = 400
        this.statusCode = StatusCodes
        this.resource = resource
    }
}

class BadRequestError extends CustomError{
    constructor(message, resource){
        super(message, StatusCodes.BAD_REQUEST, resource)
    }
}

class InternalServerError extends CustomError{
    constructor(message, resource){
        super(message, StatusCodes.INTERNAL_SERVER_ERROR, resource)
    }
}

class NotFoundError extends CustomError{
    constructor(message, resource){
        super(message, StatusCodes.NotFoundError, resource)
    }
}

class UnauthorizedError extends CustomError{
    constructor(message, resource){
        super(message, StatusCodes.UNAUTHORIZED, resource)
    }
}

class ValidationError extends CustomError{
    constructor(message, resource, typ){
        super(message, StatusCodes.ValidationError, resource)
        this.ty = typ
    }
}


function throwInternalServerError(){
    const error = new InternalServerError('something went wrong', 'server')
    throw error
}

function throwBadRequestError(message, resource){
    const err = new BadRequestError(message,resource)
    throw err
}

function throwNotFoundError(message){
    const err = new NotFoundError(message, '')
    throw err
}

function throwUnauthorizedError(message){
    typeof(message)
    if(!message) message = 'Not Authenticated'
    const err = new UnauthorizedError(message, '')
    throw err
}

function throwValidationError(message, resource, ty){
    const err = new ValidationError(message, resource, ty)
    throw err
}

module.exports = {throwValidationError, throwUnauthorizedError, throwNotFoundError, throwBadRequestError, throwInternalServerError, ValidationError}