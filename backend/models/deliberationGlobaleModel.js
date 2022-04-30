const mongoose = require("mongoose");

const deliberationSchema = new mongoose.Schema({
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
    trimester: {
      type: String,
      required: true,
    },
  },
  notes: [
    {
      studentID: {
        type: String,
        required: true,
      },
      studentName: {
        type: String,
        required: true,
      },
      laNote: {
        type: Number,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Deliberation", deliberationSchema);
