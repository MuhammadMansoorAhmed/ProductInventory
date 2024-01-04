const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")

const loggedInStatusController = asyncHandler(
    async (req, res) => {
        const token = req.cookies.token;
        if (!token) {
            return res.json(false);
        }
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        if (verifyToken) {
            return res.json(true)
        }
    }
);

module.exports = loggedInStatusController;

