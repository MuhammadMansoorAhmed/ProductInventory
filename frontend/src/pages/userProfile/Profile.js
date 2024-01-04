import { useEffect, useState } from "react";
import useRedirectLoggedOut from "../../components/customHooks/useRedirectLoggedOut"
import "./Profile.scss"
import { useDispatch } from "react-redux";
import { getUser } from "../../services/authServices";
import { SET_NAME, SET_USER } from "../../Redux/features/auth/authSlice";
import { SpinnerImage } from "../../components/loader/Loader";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";

const Profile = () => {
    useRedirectLoggedOut("/login");
    const dispatch = useDispatch()

    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        async function getUserData() {
            const data = await getUser()
            console.log(data);


            setProfile(data)
            setIsLoading(false);
            dispatch(SET_USER(data));
            dispatch(SET_NAME(data.name));
        }
        getUserData()
    }, [dispatch])

    return (
        <div className="profile --my2">
            {!isLoading && profile === null ? (
                <p>Something went wrong, please reload page</p>
            ) : (
                <Card cardClass={"card --flex-dir-column"}>
                    <span className="profile-photo">
                        <img src={profile?.photo} alt="profile pic" />
                    </span>
                    <span className="profile-data">
                        <p>
                            <b>Name :</b>{profile?.name}
                        </p>
                        <p>
                            <b>Email :</b>{profile?.email}
                        </p>
                        <p>
                            <b>Phone :</b>{profile?.phone}
                        </p>
                        <p>
                            <b>Bio :</b>{profile?.bio}
                        </p>
                        <div>
                            <Link to={`/edit-profile`}>
                                <button className="--btn --btn-primary">Edit Profile</button>
                            </Link>
                        </div>
                    </span>
                </Card>
            )}


        </div>
    )
}

export default Profile
