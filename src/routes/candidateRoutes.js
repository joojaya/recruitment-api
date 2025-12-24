const router = require("express").Router();
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const controller = require("../controllers/candidateController");

router.post("/", protect, controller.createCandidate);
router.get("/", protect, controller.getCandidates);
router.put("/:id", protect, controller.updateCandidate);

router.post(
  "/:id/resume",
  protect,
  upload.single("resume"),
  controller.uploadResume
);

module.exports = router;
