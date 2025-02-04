import React, { useState, useContext } from 'react';
import { handleLoginApi } from '../../services/userService';
import './Login.css';
import { Redirect } from 'react-router-dom';
import image from '../../assets/images/imagedoctorai.png';
import { UserContext } from '../../context/UserContext';

const Login = () => {
    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errMessage, setErrMessage] = useState('');
    const [redirectToHome, setRedirectToHome] = useState(false);
    const [redirectRegister, setRedirectRegister] = useState(false);

    const handleOnChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleOnChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleShowHidePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async () => {
        setErrMessage('');
        if (!email) {
            setErrMessage('Please enter your email.');
            return;
        }
        if (!password) {
            setErrMessage('Please enter your password.');
            return;
        }

        try {
            const response = await handleLoginApi(email, password);

            if (response && response.errCode === 0) {
                setUser(prevUser => ({ ...prevUser, email })); // Cập nhật trạng thái người dùng với email
                setRedirectToHome(true);
            } else {
                setErrMessage(response.message);
            }
        } catch (error) {
            setErrMessage(error.errMessage || 'Something went wrong, please try again.');
        }
    };

    const handleToRegister = () => {
        setRedirectRegister(true);
    };

    if (redirectToHome) {
        return <Redirect to="/home" />;
    }
    if (redirectRegister) {
        return <Redirect to="/register" />;
    }

    return (
        <div className="grid-container">
            <div className="grid-item-1">
                <img src={image} alt="Description of image" width="700" height="100%" />
            </div>
            <div className="grid-item-2">
                <div className="login-container">
                    <div className="login-content">
                        <div className="login-title">Login</div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="text"
                                className="login-input"
                                placeholder="Enter your email"
                                value={email}
                                onChange={handleOnChangeEmail}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <div className="login-password">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="login-input"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={handleOnChangePassword}
                                />
                                <span className="show-password" onClick={handleShowHidePassword}>
                                    {showPassword ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
                                </span>
                            </div>
                        </div>
                        <div style={{ color: 'red' }}>
                            {errMessage}
                        </div>
                        <button className="btn-login" onClick={handleLogin}>Login</button>
                        <div className="forgot-password">Forgot your password?</div>
                        <button className='btnn-register' onClick={handleToRegister}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Login };
