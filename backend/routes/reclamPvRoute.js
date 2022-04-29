const express = require("express");
const {
  getAllPVLetters,
  createPVReclamation,
  updatePVReclamation,
  deletePVReclamation,
  getPVReclamationDetails,
  getAllPVStudentLetter,
} = require("../controllers/reclamPVController.js");
const {
  isAuthenticatedUser,
  authorizedRole,
} = require("../middleware/auth.js");

const router = express.Router();

router
  .route("/responsable/reclamations-pv")
  .get(isAuthenticatedUser, authorizedRole("responsable"), getAllPVLetters);
router
  .route("/etudiant/reclamation-pv/new")
  .post(isAuthenticatedUser, authorizedRole("etudiant"), createPVReclamation);
router
  .route("/etudiant/reclamation-pv/:id")
  .put(isAuthenticatedUser, authorizedRole("etudiant"), updatePVReclamation)
  .delete(isAuthenticatedUser, authorizedRole("etudiant"), deletePVReclamation)
  .get(getPVReclamationDetails);

router
  .route("/etudiant/reclamation-pv/all/:id")
  .get(isAuthenticatedUser, authorizedRole("etudiant"), getAllPVStudentLetter);
module.exports = router;
