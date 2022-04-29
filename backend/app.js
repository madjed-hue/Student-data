const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const errorMiddleWare = require("./middleware/error");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

//import les routes des reclamations de Matiere.
const reclamMatiere = require("./routes/reclamMatiereRoute");

//import les routes des reclamations de Matiere.
const reclamPv = require("./routes/reclamPvRoute");

//import les routes des etudiant --etudiant.
const user = require("./routes/userRoute");

//import les routes des professeur --professeur.
const moyen = require("./routes/moyenRoute");

//import les routes des Responsabble --professeur.
// const responsable = require("./routes/responsableRoute");

app.use("/", reclamMatiere);
app.use("/", reclamPv);
app.use("/", user);
app.use("/", moyen);
// app.use("/responsable", responsable);

//Error MiddleWear
app.use(errorMiddleWare);

module.exports = app;
