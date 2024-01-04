const asyncHandler = require("express-async-handler")
const User = require("../modals/UserModel");


const getUserController = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        const { _id, name, email, photo, phone, bio } = user
        res.status(201).json({
            _id,
            name,
            email,
            photo,
            phone,
            bio,
        });
    } else {
        res.status(400)
        throw new Error("User not Found")
    }
})


module.exports = getUserController