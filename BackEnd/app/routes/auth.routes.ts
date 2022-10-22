//const users = require("../controllers/user.controller.js");

import { Application } from 'express';
import * as usersController from '../controllers/user.controller';

module.exports = (app:Application) => {

  const users:any = usersController;
  var router:any = require("express").Router();

  // Authenticate a User During Login
  router.post("/token", users.authenticate);

  // Register a user during SignUp
  router.post("/register", users.create);

  app.use("/api/auth", router);
};
