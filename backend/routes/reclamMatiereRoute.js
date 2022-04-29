const express = require("express");
const {
  getAllLetters,
  createReclamation,
  updateReclamation,
  deleteReclamation,
  getReclamationDetails,
  getAllMatiereStudentLetter,
} = require("../controllers/reclamMatiereController");
const { isAuthenticatedUser, authorizedRole } = require("../middleware/auth");
const router = express.Router();

router
  .route("/professeur/reclamations/matiere")
  .get(isAuthenticatedUser, authorizedRole("professeur"), getAllLetters);
router
  .route("/etudiant/reclamation-matiere/new")
  .post(isAuthenticatedUser, authorizedRole("etudiant"), createReclamation);
router
  .route("/etudiant/reclamation-matiere/:id")
  .put(isAuthenticatedUser, authorizedRole("etudiant"), updateReclamation)
  .delete(isAuthenticatedUser, authorizedRole("etudiant"), deleteReclamation)
  .get(getReclamationDetails);
router
  .route("/etudiant/reclamation-matiere/all/:id")
  .get(
    isAuthenticatedUser,
    authorizedRole("etudiant"),
    getAllMatiereStudentLetter
  );
module.exports = router;
