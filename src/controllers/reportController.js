const Candidate = require("../models/Candidate");

exports.hiringPipeline = async (req, res, next) => {
  try {
    const pipeline = await Candidate.aggregate([
      {
        $match: { recruiter: req.user._id }
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    const stats = {
      applied: 0,
      shortlisted: 0,
      interviewed: 0,
      hired: 0
    };

    pipeline.forEach(item => {
      stats[item._id] = item.count;
    });

    res.status(200).json({
      success: true,
      message: "Hiring pipeline analytics",
      data: stats
    });
  } catch (error) {
    next(error);
  }
};
