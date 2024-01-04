const router = require("express").Router();
const loggedInStatusController = require("../controllers/loggedInStatusController");

router.get("/loggedIn", loggedInStatusController)

module.exports = router