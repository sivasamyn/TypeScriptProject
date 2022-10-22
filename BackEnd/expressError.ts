// "use strict";

export class ExpressError extends Error {
  constructor(message:any, status:any) {
    super();
    this.message = message;
    this.status = status;
  }
}

// Raise 404 error

export class NotFoundError extends ExpressError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

// Raise 401 - Unauthorized

export class UnauthorizedError extends ExpressError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

// Raise 400 - Bad Request

export class BadRequestError extends ExpressError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

// Raise 403 - Forbidden Error

export class ForbiddenError extends ExpressError {
  constructor(message = "Bad Request") {
    super(message, 403);
  }
}

module.exports = {
  ExpressError,
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
  ForbiddenError,
};
