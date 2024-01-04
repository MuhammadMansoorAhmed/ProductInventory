const { updateProductController } = require("../controllers/getAllProductController");
const protectedRoute = require("../middleware/authMiddleware");
const { upload } = require('../utils/fileUpload');

const router = require("express").Router();

router.patch("/:id", protectedRoute, upload.single("image"), updateProductController);

module.exports = router