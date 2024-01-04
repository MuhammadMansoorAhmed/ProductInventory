const changePasswordController = require("../controllers/changePasswordController");
const protectedRoute = require("../middleware/authMiddleware");

const router = require("express").Router();

router.patch("/changePassword", protectedRoute, changePasswordController)

module.exports = router