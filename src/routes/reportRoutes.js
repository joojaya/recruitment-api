const router = require("express").Router();
const { protect } = require("../middlewares/authMiddleware");
const controller = require("../controllers/reportController");

router.get("/hiring-pipeline", protect, controller.hiringPipeline);

module.exports = router;
