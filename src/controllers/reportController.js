const Candidate = require("../models/Candidate");

exports.hiringPipeline = async (req, res) => {
  const data = {
    applied: await Candidate.countDocuments({ status: "applied" }),
    shortlisted: await Candidate.countDocuments({ status: "shortlisted" }),
    interviewed: await Candidate.countDocuments({ status: "interviewed" }),
    hired: await Candidate.countDocuments({ status: "hired" })
  };
  res.json(data);
};
