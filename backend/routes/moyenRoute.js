const express = require("express");
const {
  createMoyenAffichage,
  updateMoyenAffichage,
  getAffichage,
  deleteAffichage,
  getStudentResult,
} = require("../controllers/moyenMatiereController");
const { isAuthenticatedUser, authorizedRole } = require("../middleware/auth");
const router = express.Router();
router
  .route("/professeure/affichage/new")
  .post(
    isAuthenticatedUser,
    authorizedRole("professeur"),
    createMoyenAffichage
  );
router
  .route("/professeure/affichage/:id")
  .get(isAuthenticatedUser, authorizedRole("professeur"), getAffichage)
  .put(isAuthenticatedUser, authorizedRole("professeur"), updateMoyenAffichage)
  .delete(isAuthenticatedUser, authorizedRole("professeur"), deleteAffichage);

router
  .route("/affichage/notes")
  .get(isAuthenticatedUser, authorizedRole("etudiant"), getStudentResult);
module.exports = router;
