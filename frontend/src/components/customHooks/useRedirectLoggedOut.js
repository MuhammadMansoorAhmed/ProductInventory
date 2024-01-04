import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getLoginStatus } from "../../services/authServices"
import { SET_LOGIN } from "../../Redux/features/auth/authSlice"
import { toast } from "react-toastify"



const useRedirectLoggedOut = (path) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const redirectLoggedOutUser = async () => {
            const isLoggedIn = await getLoginStatus();
            dispatch(SET_LOGIN(isLoggedIn));

            if (!isLoggedIn) {
                toast.info("Session expired, Please log in to continue")
                navigate(path)
                return
            }
        }
        redirectLoggedOutUser()

    }, [navigate, path, dispatch])
}

export default useRedirectLoggedOut
