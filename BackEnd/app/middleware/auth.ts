// const jwt = require("jsonwebtoken");
// const { SECRET_KEY } = require("../../config");
// const { UnauthorizedError } = require("../../expressError");

import * as jwt from 'jsonwebtoken';
import * as SECRET_KEY1 from '../../config';
import { UnauthorizedError } from '../../expressError';
import { Request, Response, NextFunction } from 'express';


const SECRET_KEY:any = SECRET_KEY1;
export function authenticateJWT(req:Request, res:Response, next:NextFunction) {
  try {
    const authHeader:any = req.headers && req.headers.authorization;
    if (authHeader) {
      const token:any = authHeader.replace(/^[Bb]earer /m, "").trim();
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }
    return next();
  } catch (err) {
    return next();
  }
}

export function ensureLoggedIn(req:Request, res:Response, next:NextFunction) {
  try {
    if (!res.locals.user) throw new UnauthorizedError();
    return next();
  } catch (err) {
    return next(err);
  }
}

export function ensureAdmin(req:Request, res:Response, next:NextFunction) {
  try {
    if (!res.locals.user || !res.locals.user.isAdmin) {
      throw new UnauthorizedError();
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

export function ensureCorrectUserOrAdmin(req:Request, res:Response, next:NextFunction) {
  try {
    const user:any = res.locals.user;
    if (!(user && (user.isAdmin || user.username === req.params.username))) {
      throw new UnauthorizedError();
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  authenticateJWT,
  ensureLoggedIn,
  ensureAdmin,
  ensureCorrectUserOrAdmin,
};
