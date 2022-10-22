// const csv = require("csv-parser");
// const fs = require("fs");
// const MongoClient = require("mongodb").MongoClient;
// const url = "mongodb://localhost:27017/";
// const bcrypt = require("bcrypt");
// const { BCRYPT_WORK_FACTOR } = require("./config.js");
// const db = require("./app/models");
// const Offices = db.Offices;

const csv = require("csv-parser");
const fs = require("fs");
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("./config.js");
const db = require("./app/models");
const Offices = db.Offices;

//Read in office location data
fs.createReadStream("./seed_data/neudesicoffice_data.csv")
  .pipe(csv())
  .on("data", (row:any) => {
    // Call mongoclient and insert
    MongoClient.connect(url, function (err:any, db:any) {
      if (err) throw err;
      var dbo = db.db("neudesic");
      var OfficesToInsert = new Offices(row);

      // console.log(OfficesToInsert);
      dbo.collection("offices").insertOne(OfficesToInsert, function (err:any, res:any) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
      });
    });
  })
  .on("end", () => {
    console.log("CSV file has been processed");
  });

// Read in User data
fs.createReadStream("./seed_data/user_data.csv")
  .pipe(csv())
  .on("data", (row:any) => {
    // Call mongoclient and insert
    MongoClient.connect(url, async function (err:any, db:any) {
      if (err) throw err;
      var dbo = db.db("neudesic");
      var myObj = row;
      myObj.password = await bcrypt.hash(myObj.password, BCRYPT_WORK_FACTOR);
      myObj.isAdmin = true;
      console.log("User to insert: ");
      console.log(myObj);

      dbo.collection("users").insertOne(myObj, function (err:any, res:any) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
      });
    });
  })
  .on("end", () => {
    console.log("CSV file has been processed");
  });
