const router = require("express").Router();
const logoutController = require("../controllers/logoutController.js");

router.get("/logout", logoutController);


module.exports = router;