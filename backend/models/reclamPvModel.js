const mongoose = require("mongoose");

const reclamPvSchema = new mongoose.Schema({
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

module.exports = mongoose.model("ReclamationPV", reclamPvSchema);
