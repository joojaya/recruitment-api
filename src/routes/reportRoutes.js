const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const controller = require("../controllers/reportController");

router.get("/hiring-pipeline", auth, controller.hiringPipeline);

module.exports = router;
