const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    skills: [String],
    experience: Number,
    resumeUrl: String,
    score: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["applied", "shortlisted", "interviewed", "hired"],
      default: "applied"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Candidate", candidateSchema);
