const Candidate = require("../models/Candidate");
const cloudinary = require("../config/cloudinary");

// CREATE CANDIDATE
exports.createCandidate = async (req, res, next) => {
  try {
    const { name, email, skills, experience } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    const candidate = await Candidate.create({
      name,
      email,
      skills,
      experience,
      recruiter: req.user._id, // ownership
    });

    res.status(201).json({
      success: true,
      message: "Candidate created",
      candidate,
    });
  } catch (error) {
    next(error);
  }
};

// GET CANDIDATES (SEARCH + PAGINATION)
exports.getCandidates = async (req, res, next) => {
  try {
    const { search, status, page = 1, limit = 10 } = req.query;

    const query = { recruiter: req.user._id };

    if (status) query.status = status;

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { skills: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [candidates, total] = await Promise.all([
      Candidate.find(query)
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 }),
      Candidate.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      limit: Number(limit),
      candidates,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE CANDIDATE
exports.updateCandidate = async (req, res, next) => {
  try {
    const candidate = await Candidate.findOneAndUpdate(
      { _id: req.params.id, recruiter: req.user._id },
      req.body,
      { new: true }
    );

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found or unauthorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Candidate updated",
      candidate,
    });
  } catch (error) {
    next(error);
  }
};

// UPLOAD RESUME + SCORING
exports.uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required",
      });
    }

    const candidate = await Candidate.findOne({
      _id: req.params.id,
      recruiter: req.user._id,
    });

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found or unauthorized",
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "resumes",
      resource_type: "raw"
    });

    candidate.resumeUrl = result.secure_url;

    // SCORING LOGIC
    let score = 0;
    if (candidate.skills?.length >= 3) score += 40;
    if (candidate.experience >= 2) score += 30;
    score += 20; // resume uploaded
    score += 10; // base score

    candidate.score = score;
    candidate.status = score >= 70 ? "shortlisted" : "applied";

    await candidate.save();

    res.status(200).json({
      success: true,
      message: "Resume uploaded and candidate scored",
      resumeUrl: candidate.resumeUrl,
      score: candidate.score,
      status: candidate.status,
    });
  } catch (error) {
    next(error);
  }
};
