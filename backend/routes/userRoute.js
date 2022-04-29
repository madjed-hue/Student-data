const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
  getAllStudents,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizedRole } = require("../middleware/auth");

const router = express.Router();

router
  .route("/responsable/etudiant/new")
  .post(isAuthenticatedUser, authorizedRole("responsable"), registerUser);
router.route("/etudiant/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/user/:id").get(isAuthenticatedUser, getUserDetails);
router.route("/user/update/:id").put(isAuthenticatedUser, updateProfile);
router
  .route("/responsable/user/all")
  .get(isAuthenticatedUser, authorizedRole("responsable"), getAllUsers);
router
  .route("/responsable/user/:id")
  .get(isAuthenticatedUser, authorizedRole("responsable"), getSingleUser)
  .put(isAuthenticatedUser, authorizedRole("responsable"), updateUserRole)
  .delete(isAuthenticatedUser, authorizedRole("responsable"), deleteUser);

router
  .route("/etudiant/all")
  .get(isAuthenticatedUser, authorizedRole("professeur"), getAllStudents);
module.exports = router;
