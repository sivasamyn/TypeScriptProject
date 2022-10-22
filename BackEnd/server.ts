//const app = require("./app");
//const { PORT } = require("./config");

import * as serverApp  from './app';
import * as PORT from './config';

const app:any = serverApp;
app.listen(PORT, function () {
  console.log(`Backend server started on http://localhost:${PORT}`);
});
