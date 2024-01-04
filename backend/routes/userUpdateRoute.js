const updateUserController = require("../controllers/updateUserController");
const protectedRoute = require("../middleware/authMiddleware");
const router = require("express").Router();


router.patch("/updateUser", protectedRoute, updateUserController)

module.exports = router