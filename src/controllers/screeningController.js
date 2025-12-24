const Candidate = require("../models/Candidate");

exports.scoreCandidate = async (req, res) => {
  const candidate = await Candidate.findById(req.params.candidateId);

  let score = 0;
  if (candidate.skills.length >= 3) score += 40;
  if (candidate.experience >= 2) score += 30;
  if (candidate.resumeUrl) score += 20;
  score += 10;

  candidate.score = score;
  if (score >= 70) candidate.status = "shortlisted";

  await candidate.save();
  res.json(candidate);
};

exports.getShortlisted = async (req, res) => {
  const shortlisted = await Candidate.find({ status: "shortlisted" });
  res.json(shortlisted);
};
