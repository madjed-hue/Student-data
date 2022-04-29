const ErrorHandeler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//student authentication
exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(
      new ErrorHandeler(
        "s'il vous plaît, connectez-vous pour accéder à ces ressources",
        401
      )
    );
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  next();
});

//authorizedRole pour consulter tous les letters de reclamation pv
exports.authorizedRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandeler(
          `le Role: ${req.user.role} n'est pas autorisé à accéder à ces ressources`,
          403
        )
      );
    }

    next();
  };
};
