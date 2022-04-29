const app = require("./app");
const connectDatabase = require("../backend/config/database");
const dotEnv = require("dotenv");

// Handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("shuting down the surver due to uncaught exception");
  process.exit(1);
});

// Connect to Database
connectDatabase();

// Config
// if (process.env.NODE_ENV !== "PRODUCTION") {
//   require("dotenv").config({ path: "./backend/config/config.env" });
// }
dotEnv.config({ path: "./backend/config/config.env" });

const server = app.listen(process.env.PORT, () => {
  console.log(`server is running on port : ${process.env.PORT}`);
});

// Unhandle Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("shuting down the surver due to unhadle promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
