// const jwt = require("jsonwebtoken");
// const { SECRET_KEY } = require("../../config");

import * as jwt from 'jsonwebtoken';
import * as SECRET_KEY1 from '../../config';

/** Sign the token and return it */
const SECRET_KEY:any = SECRET_KEY1
export function createToken(user:any) {
  let payload = {
    email: user.email,
    isAdmin: user.isAdmin || false,
  };

  return jwt.sign(payload, SECRET_KEY);
}

module.exports = { createToken };
