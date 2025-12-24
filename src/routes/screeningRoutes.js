const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const controller = require("../controllers/screeningController");

router.post("/:candidateId/score", auth, controller.scoreCandidate);
router.get("/shortlist", auth, controller.getShortlisted);

module.exports = router;
