const catchAsyncError = require("../middleware/catchAsyncError");
const Moyen = require("../models/matiereMoyenModel");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandeler = require("../utils/errorHandler");

//Create affichage des moyens
exports.createMoyenAffichage = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const { name, departement, branch, matiere } = req.body;

  const details = {
    user: req.user._id,
    name: name,
    departement: departement,
    branch: branch,
    matiere: matiere,
  };
  const moyen = await Moyen.create(req.body);
  res.status(201).json({
    success: true,
    moyen,
    details,
  });
});

//Update affichage des moyens
exports.updateMoyenAffichage = catchAsyncError(async (req, res, next) => {
  const affichageId = req.params.id;
  const moyen = await Moyen.findById(affichageId);
  if (!moyen) {
    return next(new ErrorHandeler("Affichage Pas trouvé", 404));
  }
  const theUser = moyen.details.user;
  const isSameUser = req.user._id.toString();
  const theMatiere = moyen.details.matiere;
  const isSameMatiere = req.body.details.matiere;
  if (
    theUser.toString() === isSameUser &&
    theMatiere.toString() === isSameMatiere
  ) {
    let currentNotes = await moyen.moyens;
    let fullNotes = await req.body.moyens;

    let matchedResult = fullNotes.filter((o1) =>
      currentNotes.some((o2) => o1.studentID === o2.studentID)
    );

    let defrentResult = fullNotes.filter(
      (o1) => !currentNotes.some((o2) => o1.studentID === o2.studentID)
    );

    if (matchedResult) {
      console.log(matchedResult);
      currentNotes.forEach((note) => {
        if (note.toString().includes(note.studentID)) {
          fullNotes.forEach((std) => {
            if (note.studentID.toString() === std.studentID.toString()) {
              (note.studentID = std.studentID),
                (note.studentName = std.studentName),
                (note.laNote = std.laNote);
            }
          });
        }
      });
    }
    if (defrentResult) {
      defrentResult.forEach((result) => {
        const newData = {
          studentID: result.studentID,
          studentName: result.studentName,
          laNote: result.laNote,
        };
        currentNotes.push(newData);
      });
    }
  }
  await moyen.save({ validateBeforeSave: false });
  res.status(200).json({ success: true });
});

//Get all Affich of single matiere --prof
exports.getAffichage = catchAsyncError(async (req, res, next) => {
  const moyen = await Moyen.findById(req.params.id);
  if (!moyen) {
    return next(new ErrorHandeler("Affichage Pas trouvé", 404));
  }
  res.status(200).json({
    success: true,
    moyen,
  });
});

//Delete affich of single matiere --prof
exports.deleteAffichage = catchAsyncError(async (req, res, next) => {
  const moyen = await Moyen.findById(req.params.id);
  if (!moyen) {
    return res.status(500).json({
      success: false,
      message: "Affichage introuvable",
    });
  }
  await moyen.remove();
  res.status(200).json({
    success: true,
    message: "Affichage supprimée avec succès",
  });
});

//get Student Records from all affichages
exports.getStudentResult = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const details = {
    user: req.user._id,
    name: req.user.name,
    theId: req.user.theId,
  };
  const moyen = await Moyen.find();
  const data = moyen.map((result) => {
    const theModule = result.details.matiere;
    const allNotes = result.moyens;
    console.log(theModule);
    console.log(allNotes);
  });
  console.log(data);
  res.status(200).json({
    success: true,
    moyen,
  });
});
