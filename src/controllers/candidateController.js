const Candidate = require("../models/Candidate");
const cloudinary = require("../config/cloudinary");


exports.createCandidate = async (req, res) => {
  const candidate = await Candidate.create(req.body);
  res.json(candidate);
};

exports.getCandidates = async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;

  const query = search
    ? { skills: { $regex: search, $options: "i" } }
    : {};

  const candidates = await Candidate.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json(candidates);
};

exports.updateCandidate = async (req, res) => {
  const candidate = await Candidate.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(candidate);
};

exports.uploadResume = async (req, res) => {
  const candidate = await Candidate.findById(req.params.id);
  if (!candidate) return res.status(404).json({ message: "Candidate not found" });

  // Upload to Cloudinary
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "resumes",
    resource_type: "raw"
  });

  candidate.resumeUrl = result.secure_url;

  // Auto scoring
  let score = 0;
  if (candidate.skills.length >= 3) score += 40;
  if (candidate.experience >= 2) score += 30;
  score += 20; // resume uploaded
  score += 10;

  candidate.score = score;
  if (score >= 70) candidate.status = "shortlisted";

  await candidate.save();

  res.json({
    message: "Resume uploaded successfully",
    resumeUrl: candidate.resumeUrl,
    score: candidate.score
  });
};
