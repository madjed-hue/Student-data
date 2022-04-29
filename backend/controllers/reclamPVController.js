const catchAsyncError = require("../middleware/catchAsyncError");
const ReclamationPV = require("../models/reclamPVModel");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandeler = require("../utils/errorHandler");

// création d'une lettre de réclamation  -- Etudiant
exports.createPVReclamation = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;

  const { name, departement, branch } = req.body;

  const details = {
    user: req.user._id,
    name: name,
    departement: departement,
    branch: branch,
  };
  const reclamation = await ReclamationPV.create(req.body);
  res.status(201).json({
    success: true,
    reclamation,
    details,
  });
});

// Trouvez tous les lettres de réclamation --responsable
exports.getAllPVLetters = catchAsyncError(async (req, res) => {
  const resultPerPage = 8;
  const reclamationsCount = await ReclamationPV.countDocuments();
  const apiFeature = new ApiFeatures(ReclamationPV.find(), req.query)
    .toFind()
    .filter()
    .pagination(resultPerPage);
  const reclamations = await apiFeature.query;
  let filteredReclamationsCount = reclamations.length;
  apiFeature.pagination(resultPerPage);

  res.status(200).json({
    success: true,
    reclamations,
    reclamationsCount,
    resultPerPage,
    filteredReclamationsCount,
  });
});

// Trouvez tous les lettres de réclamation(matiere) --etudiant
exports.getAllPVStudentLetter = catchAsyncError(async (req, res) => {
  const resultPerPage = 8;
  const reclamationsCount = await ReclamationPV.countDocuments();
  const apiFeature = new ApiFeatures(
    ReclamationPV.find({ user: req.user.id }),
    req.query
  )
    .toFind()
    .filter()
    .pagination(resultPerPage);
  const reclamations = await apiFeature.query;
  let filteredReclamationsCount = reclamations.length;
  apiFeature.pagination(resultPerPage);

  res.status(200).json({
    success: true,
    reclamations,
    reclamationsCount,
    resultPerPage,
    filteredReclamationsCount,
  });
});

// mettre à jour d'une letter de reclamation  -- Etudiant
exports.updatePVReclamation = catchAsyncError(async (req, res, next) => {
  let reclamation = await ReclamationPV.findById(req.params.id);
  if (!reclamation) {
    return res.status(500).json({
      success: false,
      message: "Réclamation introuvable",
    });
  }
  reclamation = await ReclamationPV.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    reclamation,
  });
});

//Obtenir les détails de la lettre de réclamation
exports.getPVReclamationDetails = catchAsyncError(async (req, res, next) => {
  const reclamation = await ReclamationPV.findById(req.params.id);
  if (!reclamation) {
    return next(new ErrorHandeler("Réclamation introuvable", 404));
  }
  res.status(200).json({
    success: true,
    reclamation,
  });
});

// suprimer une letter de reclamation  -- Etudiant
exports.deletePVReclamation = catchAsyncError(async (req, res, next) => {
  const reclamation = await ReclamationPV.findById(req.params.id);
  if (!reclamation) {
    return res.status(500).json({
      success: false,
      message: "Réclamation introuvable",
    });
  }
  await reclamation.remove();

  res.status(200).json({
    success: true,
    message: "Réclamation supprimée avec succès",
  });
});
