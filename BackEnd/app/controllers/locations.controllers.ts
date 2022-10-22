//const db = require("../models");
import * as db from '../models';

const Offices:any = db;

// Create a New Office
exports.create = (req:any, res:any) => {
  if (!req.body.address) {
    res.status(400).send({ message: "You must include an address" });
    return;
  }

  const Office:any = new Offices({
    address: req.body.address,
    city: req.body.city,
    stateOrProvince: req.body.stateOrProvince,
    zipOrPostalCode: req.body.zipOrPostalCode,
    empolyee: req.body.empolyee,
    locationUrl: req.body.locationUrl,
    status: req.body.status,
  });

  Office
    .save(Office)
    .then((data:any) => {
      res.send(data);
    })
    .catch((err:any) => {
      res.status(500).send({
        message: err.message || "Error encountered while creating the Office",
      });
    });
};

// Find all Offices in Database
exports.findAll = (req:any, res:any) => {
  const address:string = req.query.address;
  var condition = address
    ? { address: { $regex: new RegExp(address), $options: "i" } }
    : {};

    Offices.find(condition)
    .then((data:any) => {
      res.send(data);
    })
    .catch((err:any) => {
      res.status(500).send({
        message: err.message || "An error occurred while retrivieng Offices data",
      });
    });
};
