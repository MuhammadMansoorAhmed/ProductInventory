const { getAllProductController } = require("../controllers/getAllProductController");
const protectedRoute = require("../middleware/authMiddleware");

const router = require("express").Router();

router.get("/", protectedRoute, getAllProductController);

module.exports = router