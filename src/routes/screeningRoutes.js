const router = require("express").Router();
const { protect } = require("../middlewares/authMiddleware");
const controller = require("../controllers/screeningController");

router.post("/:candidateId/score", protect, controller.scoreCandidate);
router.get("/shortlist", protect, controller.getShortlisted);

module.exports = router;
