//const Offices = require("../controllers/locations.controllers.js")

import { Application } from 'express';
import * as LocationOffices from '../controllers/locations.controllers';


module.exports = (app:Application) => {
  const Offices:any = LocationOffices;

  var router = require("express").Router();

  //Retrieve All Offices
  router.get("/", Offices.findAll);

  //Post to A Office
  router.post("/", Offices.create);

  app.use("/api/locations", router);
};
