const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const controller = require("../controllers/candidateController");

router.post("/", auth, controller.createCandidate);
router.get("/", auth, controller.getCandidates);
router.put("/:id", auth, controller.updateCandidate);

// 🔥 Resume Upload
router.post(
  "/:id/resume",
  auth,
  upload.single("resume"),
  controller.uploadResume
);

module.exports = router;
