// const db = require("../models");
// const Users = db.Users;
// const bcrypt = require("bcrypt");
// const {
//   NotFoundError,
//   BadRequestError,
//   UnauthorizedError,
// } = require("../../expressError");
// const userRegisterSchema = require("../schemas/userRegister.json");
// const userAuthSchema = require("../schemas/userAuth.json");
// const userEditSchema = require("../schemas/userEdit.json");

// const { BCRYPT_WORK_FACTOR } = require("../../config.js");
// const jsonschema = require("jsonschema");
// const { createToken } = require("../helpers/token");


import * as db from '../models';
import * as bcrypt from 'bcrypt';
import { NotFoundError,BadRequestError,UnauthorizedError } from '../../expressError';
import userRegisterSchema from '../schemas/userRegisterSchema.json';
import userAuthSchema from '../schemas/userAuth.json';
import userEditSchema from '../schemas/userEdit.json';
import * as BCRYPT_WORK_FACTOR1  from '../../config';
import * as jsonschema from 'jsonschema';
import { createToken } from '../helpers/token';
import { Request, Response, NextFunction } from 'express';

const BCRYPT_WORK_FACTOR:any = BCRYPT_WORK_FACTOR1;
const Users:any = db;
//Create a New User
exports.create = async (req:Request, res:Response, next:NextFunction) => {

  const validator = jsonschema.validate(req.body, userRegisterSchema);
  if (!validator.valid) {
    const errs:any = validator.errors.map((e:any) => e.stack);
    return next(new BadRequestError(errs));
  }

  let hashedPassword = await bcrypt.hash(req.body.password, BCRYPT_WORK_FACTOR);
  let newUser:any;
    newUser = new Users({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
    isAdmin: false,
  });
  const token = createToken(newUser);

  newUser
    .save(newUser)
    .then((data:any) => {
      res.status(201).send({ token });
    })
    .catch((err:any) => {
      res.status(500).send({
        message: err.message || "An error occured while creating user",
      });
    });
};

exports.authenticate = async (req:Request, res:Response, next:NextFunction) => {
  const validator = jsonschema.validate(req.body, userAuthSchema);
  if (!validator.valid) {
    const errs:any = validator.errors.map((e:any) => e.stack);
    throw new BadRequestError(errs);
  }

  const { email, password } = req.body;

  let user:any = await Users.findOne({
    email: email,
  });

  if (user) {
    const isValid:boolean = await bcrypt.compare(password, user.password);
    if (isValid === true) {
      const token:any = createToken(user);
      return res.status(200).json({ token });
    } else {
      next(new UnauthorizedError());
    }
  }

  next(new NotFoundError());
};

exports.getAllUsers = async (req:Request, res:Response, next:NextFunction) => {
  let users:any = await Users.find();

  return res.json({ users });
};

exports.getAUser = async (req:Request, res:Response, next:NextFunction) => {
  let email:string = req.params.email;

  let user = await Users.find({
    email: email,
  });

  if (user.length > 0) {
    return res.status(200).json({ user });
  }

  next(new NotFoundError());
};

exports.updateAUser = async (req:Request, res:Response, next:NextFunction) => {
  const validator:any = jsonschema.validate(req.body, userEditSchema);

  if (!validator.valid) {
    const errs:string = validator.errors.map((e:any) => e.stack);
    throw new BadRequestError(errs);
  }

  let hashedPassword:any = await bcrypt.hash(req.body.password, BCRYPT_WORK_FACTOR);

  //TO DO: SEND BACK UPDATED USER
  Users.updateOne(
    { email: req.params.email },
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hashedPassword,
    }
  )
    .then((data:object) => {
      res.status(201).send({ message: "user updated" });
    })
    .catch((err:any) => {
      res.status(500).send({
        message: err.message || "An error occured while creating user",
      });
    });

  next(new NotFoundError());
};

exports.removeAUser = async (req:Request, res:Response, next:NextFunction) => {
  await Users.deleteOne({ email: req.params.email }).then((data:object) => {
    res.status(200).send({ message: "sucessfully deleted" });
  });
};
