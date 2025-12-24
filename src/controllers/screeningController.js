const Candidate = require("../models/Candidate");

// SCORE CANDIDATE
exports.scoreCandidate = async (req, res, next) => {
  try {
    const candidate = await Candidate.findOne({
      _id: req.params.candidateId,
      recruiter: req.user._id, // 🔐 ownership
    });

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found or unauthorized",
      });
    }

    let score = 0;
    if (candidate.skills?.length >= 3) score += 40;
    if (candidate.experience >= 2) score += 30;
    if (candidate.resumeUrl) score += 20;
    score += 10;

    candidate.score = score;
    candidate.status = score >= 70 ? "shortlisted" : "applied";

    await candidate.save();

    res.status(200).json({
      success: true,
      message: "Candidate scored successfully",
      data: {
        candidateId: candidate._id,
        score: candidate.score,
        status: candidate.status,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET SHORTLISTED CANDIDATES
exports.getShortlisted = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const [candidates, total] = await Promise.all([
      Candidate.find({
        recruiter: req.user._id,
        status: "shortlisted",
      })
        .skip(skip)
        .limit(Number(limit))
        .sort({ updatedAt: -1 }),
      Candidate.countDocuments({
        recruiter: req.user._id,
        status: "shortlisted",
      }),
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
