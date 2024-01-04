import { useState } from 'react';
import './ChangePassword.scss'
import { toast } from 'react-toastify';
import Card from '../card/Card';
import { changePassword } from '../../services/authServices';
import { useNavigate } from 'react-router-dom';


const initialState = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
}
const ChangePassword = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState(initialState);
    const { oldPassword, newPassword, confirmPassword } = formData;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const changePass = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("Password did not matched")
        }

        const sendFormData = {
            oldPassword,
            newPassword
        }
        const resData = await changePassword(sendFormData);
        toast.success(resData);
        navigate("/profile")
    }

    return (
        <div className='change-password'>
            <Card cardClass={"password-card"}>
                <h3>Change Password</h3>
                <form onSubmit={changePass} className='--form-control'>
                    <input type="password"
                        placeholder='Old Password'
                        required
                        name='oldPassword'
                        value={oldPassword}
                        onChange={handleInputChange}
                    />
                    <input type="password"
                        placeholder='New Password'
                        required
                        name='newPassword'
                        value={newPassword}
                        onChange={handleInputChange}
                    />
                    <input type="password"
                        placeholder='Confirm New Password'
                        required
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={handleInputChange}
                    />
                    <button className='--btn --btn-primary' type='submit'>
                        Change Password
                    </button>
                </form>

            </Card>
        </div>
    )
}

export default ChangePassword
