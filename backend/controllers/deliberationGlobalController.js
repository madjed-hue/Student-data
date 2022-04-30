const catchAsyncError = require("../middleware/catchAsyncError");
const Deliberation = require("../models/deliberationGlobaleModel");
const ErrorHandeler = require("../utils/errorHandler");

//Create deliberation
exports.createDeliberation = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const { name, departement, branch } = req.body;

  const details = {
    user: req.user._id,
    name: name,
    departement: departement,
    branch: branch,
  };
  const deliberation = await Deliberation.create(req.body);
  res.status(201).json({
    success: true,
    deliberation,
    details,
  });
});

//Update affichage des moyens
exports.updateDeliberation = catchAsyncError(async (req, res, next) => {
  const deliberationId = req.params.id;
  const deliberation = await Deliberation.findById(deliberationId);
  if (!deliberation) {
    return next(new ErrorHandeler("Affichage Pas trouvé", 404));
  }
  const theUser = deliberation.details.user;
  const isSameUser = req.user._id.toString();
  if (theUser.toString() === isSameUser) {
    let currentNotes = await deliberation.notes;
    let fullNotes = await req.body.notes;

    let matchedResult = fullNotes.filter((o1) =>
      currentNotes.some((o2) => o1.studentID === o2.studentID)
    );

    let defrentResult = fullNotes.filter(
      (o1) => !currentNotes.some((o2) => o1.studentID === o2.studentID)
    );

    if (matchedResult) {
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
  await deliberation.save({ validateBeforeSave: false });
  res.status(200).json({ success: true });
});

//Get Deliberation Details --Responsable
exports.getDeliberation = catchAsyncError(async (req, res, next) => {
  const deliberation = await Deliberation.findById(req.params.id);
  if (!deliberation) {
    return next(new ErrorHandeler("Affichage Pas trouvé", 404));
  }
  res.status(200).json({
    success: true,
    deliberation,
  });
});

//Delete Deliberation --prof
exports.deleteDeliberation = catchAsyncError(async (req, res, next) => {
  const deliberation = await Deliberation.findById(req.params.id);
  if (!deliberation) {
    return res.status(500).json({
      success: false,
      message: "Affichage introuvable",
    });
  }
  await deliberation.remove();
  res.status(200).json({
    success: true,
    message: "Affichage supprimée avec succès",
  });
});

//get Student note from Deliberation
exports.getStudentNote = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const details = {
    user: req.user._id,
    name: req.user.name,
    theId: req.user.theId,
  };
  const deliberation = await Deliberation.find();
  const data = deliberation.map((result) => {
    return result;
  });
  const sudentResult = data.map((note) => {
    const result = {
      notes: note.notes,
      details: note.details,
    };
    const isSameStudent = result.notes.find(
      (std) => std.studentID.toString() === details.theId.toString()
    );
    console.log(isSameStudent);
    if (isSameStudent) {
      const finalData = {
        trimester: note.details.trimester,
        responsableName: note.details.name,
        studentID: isSameStudent.studentID,
        studentName: isSameStudent.studentName,
        laNote: isSameStudent.laNote,
      };
      return finalData;
    }
  });
  res.status(200).json({
    success: true,
    sudentResult,
  });
});
