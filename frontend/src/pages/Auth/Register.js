import styles from "./auth.module.scss";
import { TiUserAddOutline } from "react-icons/ti"
import Card from '../../components/card/Card';
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import { toast } from "react-toastify";
import { registerUser, validateEmail } from "../../services/authServices";
import { useDispatch } from "react-redux"
import { SET_LOGIN, SET_NAME } from "../../Redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";


const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
}

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const { name, email, password, confirmPassword } = formData;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const register = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            return toast.error("All fields are required")
        }
        if (password !== confirmPassword) {
            return toast.error("Password did not match")
        }
        if (password.length < 6) {
            return toast.error("Password password must be upto 6 characters")
        }
        if (!validateEmail(email)) {
            return toast.error("Please enter a valid email");
        }
        const userData = {
            name,
            email,
            password,
        }
        setIsLoading(true)
        try {
            const data = await registerUser(userData);
            // console.log(data);
            await dispatch(SET_LOGIN(true))
            await dispatch(SET_NAME(data.name))
            navigate("/dashboard")
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.error(error.message);
        }

    }

    return (
        <div className={`container ${styles.auth}`}>
            {isLoading && <Loader />}
            <Card>
                <div className={styles.form}>
                    <div className="--flex-center">
                        <TiUserAddOutline size={35} color='#999' />
                    </div>
                    <h2>Register</h2>
                    <form >
                        <input type="text"
                            placeholder='Name'
                            required
                            name='name'
                            value={name}
                            onChange={handleInputChange}
                        />
                        <input type="email"
                            placeholder='Email'
                            required
                            name='email'
                            value={email}
                            onChange={handleInputChange}
                        />
                        <input type="password"
                            placeholder='Password'
                            required
                            name='password'
                            value={password}
                            onChange={handleInputChange}
                        />
                        <input type="password"
                            placeholder='Confirm Password'
                            required
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={handleInputChange}
                        />
                        <button className='--btn --btn-primary --btn-block' onClick={register} type='submit'>Register</button>
                    </form>
                    <span className={styles.register}>
                        <Link to='/'>Home</Link>
                        <p>&nbsp; Already have an account? &nbsp;</p>
                        <Link to='/login'>Login</Link>
                    </span>
                </div>
            </Card>
        </div>
    )
}

export default Register
