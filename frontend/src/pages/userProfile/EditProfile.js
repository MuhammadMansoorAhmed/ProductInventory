import { useEffect, useState } from "react";
import "./Profile.scss"
import { useSelector } from "react-redux";
import { selectUser } from "../../Redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import { toast } from "react-toastify";
import { updateUser } from "../../services/authServices";
import ChangePassword from "../../components/changePassword/ChangePassword";


const EditProfile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector(selectUser);
    const { email } = user;
    const navigate = useNavigate()

    useEffect(() => {
        if (!email) {
            navigate("/profile")
        }
    }, [email, navigate])

    const initialState = {
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        bio: user?.bio,
        photo: user?.photo,
    }

    const [profile, setProfile] = useState(initialState);
    const [profileImage, setProfileImage] = useState("")

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile, [name]: value
        })
    }


    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0])
    }
    const saveProfile = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            //Handle Img Upload to cloudianary
            let imgUrl;
            if (profileImage && (profileImage.type === "image/jpg" || profileImage.type === "image/jpeg" ||
                profileImage.type === "image/png")) {
                const image = new FormData();
                image.append("file", profileImage)
                image.append("cloud_name", "dzlit8ob8")
                image.append("upload_preset", "famwazap")


                // First Save Image to Cloudinary
                const response = await fetch(
                    "https://api.cloudinary.com/v1_1/dzlit8ob8/image/upload",
                    {
                        method: "post",
                        body: image,
                    }
                );
                const imageData = await response.json()
                imgUrl = imageData.url.toString()
            }
            //save Profile
            const formData = {
                name: profile.name,
                phone: profile.phone,
                bio: profile.bio,
                photo: profileImage ? imgUrl : profile.photo,
            }
            const data = await updateUser(formData)
            console.log(data);
            toast.success("user updated successfully")
            navigate("/profile")
            setIsLoading(false)


        } catch (error) {
            console.log(error);
            setIsLoading(false)
            toast.error(error.message)
        }

    }

    return (
        <div className="profile --my2">
            {isLoading && <Loader />}
            <Card cardClass={"card --flex-dir-column"}>
                <span className="profile-photo">
                    <img src={user?.photo} alt="profile pic" />
                </span>
                <form className="--form-control --m" onSubmit={saveProfile}>
                    <span className="profile-data">
                        <p>
                            <label >Name: </label>
                            <input type="text"
                                name="name"
                                value={profile?.name}
                                onChange={handleInputChange}
                            />

                        </p>
                        <p>
                            <label >Email: </label>
                            <input type="text"
                                name="email"
                                value={profile?.email}
                                disabled

                            />
                            <br />
                            Email Cannot be change
                        </p>
                        <p>
                            <label >Phone: </label>
                            <input type="text"
                                name="phone"
                                value={profile?.phone}
                                onChange={handleInputChange}
                            />
                        </p>
                        <p>
                            <label >Bio: </label>
                            <textarea type="text"
                                name="bio"
                                value={profile?.bio}
                                onChange={handleInputChange}
                                cols="30" rows="10"
                            />
                        </p>
                        <p>
                            <label >Photo: </label>
                            <input type="file"
                                name="image"
                                onChange={handleImageChange}
                            />
                        </p>
                        <div>

                            <button className="--btn --btn-primary">Save Profile</button>

                        </div>
                    </span>
                </form>
            </Card>
            <br />
            <ChangePassword />

        </div>
    )
}

export default EditProfile
