const router = require("express").Router();
const getUserController = require("../controllers/getUserController");
const protectedRoute = require("../middleware/authMiddleware");

router.get("/getUserRoute", protectedRoute, getUserController)


module.exports = router 