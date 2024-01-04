const contactController = require("../controllers/contactController");
const protectedRoute = require("../middleware/authMiddleware");

const router = require("express").Router();


router.post("/", protectedRoute, contactController);


module.exports = router