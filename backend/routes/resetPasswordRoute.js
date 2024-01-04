const resetPasswordController = require("../controllers/resetPasswordController");

const router = require("express").Router();

router.post("/resetPassword", resetPasswordController)

module.exports = router;