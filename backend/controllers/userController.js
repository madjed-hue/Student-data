const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandeler = require("../utils/errorHandler");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

//Inscrire un étudiant
exports.registerUser = catchAsyncError(async (req, res, next) => {
  // nous allons utiliser Cloudinary pour héberger nos avatars plus tard
  const { theId, name, password, role, matiere, departement, branch } =
    req.body;
  const user = await User.create({
    theId,
    name,
    password,
    role,
    matiere,
    departement,
    branch,
    avatar: {
      public_id: "myCloud.public_id",
      url: "myCloud.secure_url",
    },
  });

  const token = user.getJWTToken();
  res.status(201).json({
    success: true,
    token,
  });
});

//connexion étudiant
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { theId, password } = req.body;

  //vérifier si l'étudiant saisit son email et son mot de passe
  if (!theId || !password) {
    return next(
      new ErrorHandeler("Veuillez saisir un id ou un mot de passe", 400)
    );
  }

  const user = await User.findOne({ theId }).select("+password");
  //vérifier si l'étudiant existe depuis son email
  if (!user) {
    return next(new ErrorHandeler("id ou mot de passe invalide"));
  }

  //vérifier si le mot de passe saisi correspond au mot de passe dans la BD
  const isMatchedPassword = await user.comparePassword(password);
  if (!isMatchedPassword) {
    return next(new ErrorHandeler("Mot de passe invalide", 401));
  }

  sendToken(user, 201, res);
});

//Déconnecter l'étudiant
exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Déconnecté avec succès",
  });
});

//Get User Details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  let user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

//Update User Profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  let user = await User.findById(req.user.id);
  try {
    user = await User.findById(req.user.id);
    user.name = req.body.name;
    user.theId = req.body.theId;
    user.matiere = req.body.matiere;
    user.departement = req.body.departement;
    user.branch = req.body.branch;
    user.years = req.body.years;

    // if (req.body.avatar !== "") {
    //   const imageId = user.avatar.public_id;
    //   await cloudinary.v2.uploader.destroy(imageId);
    //   const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //     folder: "avatars",
    //     width: 150,
    //     crop: "scale",
    //   });
    //   user.avatar = {
    //     public_id: myCloud.public_id,
    //     url: myCloud.secure_url,
    //   };
    // }

    await user.save();
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandeler(error.message));
  }
});

//Get All Users (admin)
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

//Get All Students (Prof)
exports.getAllStudents = catchAsyncError(async (req, res, next) => {
  const users = await User.find({ role: "etudiant" });

  res.status(200).json({
    success: true,
    users,
  });
});

//Get Single User (admin)
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandeler(
        `L'utilisateur n'existe pas avec l'identifiant : ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

//Update User Role --admin
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  let user;

  try {
    user = await User.findById(req.params.id);
    user.name = req.body.name;
    user.id = req.body.id;
    user.role = req.body.role;
    await user.save();
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandeler(error.message));
  }
});

//Delete User --admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandeler(
        `L'utilisateur n'existe pas avec l'identifiant : ${req.params.id}`,
        400
      )
    );
  }
  // const imageId = user.avatar.public_id;

  // await cloudinary.v2.uploader.destroy(imageId);

  await user.remove();

  res.status(200).json({
    success: true,
    message: "Utilisateur supprimé avec succès",
  });
});
