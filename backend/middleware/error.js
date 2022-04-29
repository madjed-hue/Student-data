const errorHandler = require("../utils/errorHandler");
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Erreur interne du serveur";

  // wrong mongodb id error (Cast to ObjectId failed)
  if (err.name === "CastError") {
    const message = `Ressource introuvable, Invalid ${err.path}`;
    err = new errorHandler(message, 400);
  }

  //Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Données en double, Ce ${Object.keys(
      err.keyValue
    )} est déjà utilisé`;
    err = new errorHandler(message, 400);
  }

  // wrong JWT error
  if (err.name === "jsonWebTokenError") {
    const message = `JSON web Token n'est pas valide, réessayer`;
    err = new errorHandler(message, 400);
  }

  // JWT Expire error
  if (err.name === "TokenExpiredError") {
    const message = `JSON web Token a expiré, réessayer`;
    err = new errorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
