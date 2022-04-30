const express = require("express");
const {
  createDeliberation,
  updateDeliberation,
  getDeliberation,
  deleteDeliberation,
  getStudentNote,
} = require("../controllers/deliberationGlobalController");
const { isAuthenticatedUser, authorizedRole } = require("../middleware/auth");
const router = express.Router();

router
  .route("/responsable/deliberation/new")
  .post(isAuthenticatedUser, authorizedRole("responsable"), createDeliberation);

router
  .route("/responsable/deliberation/:id")
  .put(isAuthenticatedUser, authorizedRole("responsable"), updateDeliberation)
  .get(isAuthenticatedUser, authorizedRole("responsable"), getDeliberation)
  .delete(
    isAuthenticatedUser,
    authorizedRole("responsable"),
    deleteDeliberation
  );

router
  .route("/deliberation/notes")
  .get(isAuthenticatedUser, authorizedRole("etudiant"), getStudentNote);

module.exports = router;
