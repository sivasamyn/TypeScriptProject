
//const dbConfig = require("../config/db.config.js");
//const mongoose = require("mongoose");

import * as dbConfig from '../config/db.config';
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const db:any = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.Offices = require("./locations.model.js")(mongoose);
db.Users = require("./user.model.js")(mongoose);

module.exports = db;
