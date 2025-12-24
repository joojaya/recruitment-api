const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
  {
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // 🔍 ownership queries
    },

    name: {
      type: String,
      required: [true, "Candidate name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Candidate email is required"],
      lowercase: true,
      trim: true,
    },

    skills: {
      type: [String],
      default: [],
      index: true, // 🔍 search
    },

    experience: {
      type: Number,
      default: 0,
      min: 0,
    },

    resumeUrl: {
      type: String,
    },

    score: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    status: {
      type: String,
      enum: ["applied", "shortlisted", "interviewed", "hired"],
      default: "applied",
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Candidate", candidateSchema);
