import styles from "./auth.module.scss";
import { MdPassword } from "react-icons/md"
import Card from '../../components/card/Card';
import { Link, useNavigate, useParams } from "react-router-dom"
import { useState } from "react";
import { resetPassword } from "../../services/authServices";
import { toast } from "react-toastify";


const initialState = {
    password: "",
    confirmPassword: "",
}


const Reset = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);
    const { password, confirmPassword, } = formData;
    const { resetToken } = useParams()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleReset = async (e) => {
        e.preventDefault();

        if (!password || !confirmPassword) {
            return toast.error("All fields are required")
        }
        if (password !== confirmPassword) {
            return toast.error("Password did not match")
        }
        if (password.length < 6) {
            return toast.error("Password password must be upto 6 characters")
        }

        const userData = {
            password,
            confirmPassword,
        }

        try {
            const data = await resetPassword(userData, resetToken);
            toast.success(data.message)
            navigate("/login")
        } catch (error) {
            console.log(error.message);
        }

    }


    return (
        <div className={`container ${styles.auth}`}>
            <Card>
                <div className={styles.form}>
                    <div className="--flex-center">
                        <MdPassword size={35} color='#999' />
                    </div>
                    <h2>Reset Password</h2>
                    <form onSubmit={handleReset}>
                        <input type="password"
                            placeholder='New Password'
                            required
                            name='password'
                            value={password}
                            onChange={handleInputChange}
                        />
                        <input type="password"
                            placeholder='Confirm New Password'
                            required
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={handleInputChange}
                        />

                        <button className='--btn --btn-primary --btn-block' type='submit'>Reset Password</button>
                        <div className={styles.links}>
                            <p>
                                <Link to='/'>- Home</Link>
                            </p>
                            <p>
                                <Link to='/login'>- Login</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </Card>
        </div>
    )
}

export default Reset;
