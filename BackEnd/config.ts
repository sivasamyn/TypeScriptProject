require("dotenv").config();
//require("colors");
import * as colors from 'colors';

const SECRET_KEY:string = process.env.SECRET_KEY || "secret-key-dev";

const PORT:any = process.env.PORT || 3001;

// Use the development database, testing database, or production via env
// variables
function getDatabaseUri() {
  return process.env.NODE_ENV === "test"
    ? "app_test"
    : process.env.DATABASE_URL || "neudesic";
}

// Set bcrypt factor lower during testing
const BCRYPT_WORK_FACTOR:any = process.env.NODE_ENV === "neudesic" ? 1 : 12;

console.log("Application Configuration: ".green);
console.log("SECRET_KEY ".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, getDatabaseUri());
console.log("---");

module.exports = {
  SECRET_KEY,
  BCRYPT_WORK_FACTOR,
  PORT,
  getDatabaseUri,
};
