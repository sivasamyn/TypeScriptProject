//const Offices = require("../controllers/locations.controllers.js")

import * as LocationOffices from '../controllers/locations.controllers';


module.exports = (app:any) => {
  const Offices:any = LocationOffices;

  var router = require("express").Router();

  //Retrieve All Offices
  router.get("/", Offices.findAll);

  //Post to A Office
  router.post("/", Offices.create);

  app.use("/api/locations", router);
};
