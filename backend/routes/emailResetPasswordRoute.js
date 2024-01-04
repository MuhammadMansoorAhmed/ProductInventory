const emailResetPasswordController = require("../controllers/emailResetPasswordController");

const router = require("express").Router();

router.put("/emailResetPasswordRoute/:resetToken", emailResetPasswordController)


module.exports = router