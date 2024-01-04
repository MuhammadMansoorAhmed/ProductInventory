const { deleteProduct } = require("../controllers/getAllProductController");
const protectedRoute = require("../middleware/authMiddleware");

const router = require("express").Router();

router.delete("/:id", protectedRoute, deleteProduct);

module.exports = router