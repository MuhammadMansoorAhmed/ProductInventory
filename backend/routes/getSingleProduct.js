const { getSingleProduct } = require("../controllers/getAllProductController");
const protectedRoute = require("../middleware/authMiddleware");

const router = require("express").Router();

router.get("/:id", protectedRoute, getSingleProduct);

module.exports = router