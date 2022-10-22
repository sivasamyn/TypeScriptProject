import * as dbModel from './app/models';

const db:any = dbModel;
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch((err:any) => {
    console.log("Error: Cannot connect to the database...see: ", err);
    process.exit();
  });

module.exports = db;
