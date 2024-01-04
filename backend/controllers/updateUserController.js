const asyncHandler = require("express-async-handler");
const User = require("../modals/UserModel");


const updateUserController = asyncHandler(
    async (req, res) => {
        const user = await User.findById(req.user._id);

        if (user) {
            const { name, email, photo, phone, bio } = user;
            user.email = email;
            user.name = req.body.name || name;
            user.photo = req.body.photo || photo;
            user.phone = req.body.phone || phone;
            user.bio = req.body.bio || bio;


            const updatedUser = await user.save();
            res.status(200).json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                photo: updatedUser.photo,
                phone: updatedUser.phone,
                bio: updatedUser.bio,
            })
        } else {
            res.status(404);
            throw new Error("User Not Found")
        }
    }

)

module.exports = updateUserController