const asyncHandler = require("express-async-handler");
const User = require("../modals/UserModel");
const jwt = require("jsonwebtoken");

const protectedRoute = asyncHandler(
    async (req, res, next) => {
        try {
            const token = req.cookies.token;

            if (!token) {
                res.status(401)
                throw new Error("Not Authorize, please Login")
            }
            //verify Token
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(verified.id).select("-password");

            if (!user) {
                res.status(401)
                throw new Error("User Not Found")
            }
            req.user = user;
            next();
        } catch (error) {
            res.status(401)
            throw new Error("Not Authorize, please Login")
        }
    }
);

module.exports = protectedRoute;