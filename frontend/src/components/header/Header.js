import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../services/authServices"
import { SET_LOGIN, selectName } from "../../Redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";


const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const name = useSelector(selectName);

    const logoutUser = async () => {
        await logOutUser();
        await dispatch(SET_LOGIN(false))
        navigate("/login")
        // setIsLoading(false)
    }
    return (
        <div className="--pad header">
            <div className="--flex-between">
                <h3>
                    <span className="--fw-thin">Welcome, </span>
                    <span className="--color-danger">{name}</span>
                </h3>
                <button onClick={logoutUser} className="--btn --btn-danger">Logout</button>
            </div>
            <hr />
        </div>
    )
}

export default Header
