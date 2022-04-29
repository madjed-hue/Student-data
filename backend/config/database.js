const mongoose = require("mongoose");
const dotEnv = require("dotenv");
dotEnv.config({ path: "./backend/config/config.env" });

const connectDatabasa = () => {
  mongoose.connect(process.env.DB_URI).then((data) => {
    console.log(`mongodb connected with server ${data.connection.host}`);
  });
};
module.exports = connectDatabasa;
