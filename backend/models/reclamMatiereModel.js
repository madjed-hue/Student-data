const mongoose = require("mongoose");

const reclamSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: [true, "s'il vous plaît, indiquer l'objet de la réclamation"],
    trim: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  details: {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    departement: {
      type: String,
    },
    branch: {
      type: String,
    },
  },
  matier: {
    type: String,
    required: [
      true,
      "s'il vous plaît, indiquer la matière qui voulez vous déposer la réclamation",
    ],
  },
  profDeMatiere: {
    type: String,
    required: [true, "Veuillez sélectionner l'enseignant pour la matière"],
  },
  description: {
    type: String,
    required: [
      true,
      "s'il vous plaît, indiquer l'objet de la lettre de réclamation",
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ReclamationMatiere", reclamSchema);
