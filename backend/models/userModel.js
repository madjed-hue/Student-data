const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  theId: {
    type: String,
    required: [true, "Le ID est obligatoire, veuillez vérifier à nouveau"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Le nom est obligatoire, veuillez vérifier à nouveau"],
    maxLength: [30, "Le nom ne peut pas comporter plus de 30 caractères"],
    minLength: [4, "Le nom ne peut pas être inférieur à 4 caractères"],
  },

  password: {
    type: String,
    required: [true, "Le mot de passe est requis"],
    maxLength: [15, "Le mot de passe doit comporter moins de 15 caractères"],
    minLength: [6, "Le mot de passe doit être supérieur à 6 caractères"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
    required: [true, "Le Role est requis"],
  },
  matiere: {
    type: String,
  },
  departement: {
    type: String,
  },
  branch: {
    type: String,
  },
  years: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// hacher le mot de passe avant de l'enregistrer
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//JWT Token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//compare Password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
