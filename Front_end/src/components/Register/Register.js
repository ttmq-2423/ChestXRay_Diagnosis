import React, { useState, useContext } from 'react';
import './Register.css';
import { Redirect, useHistory } from 'react-router-dom';
import { handleRegisterApi } from '../../services/userService';
import image from '../../assets/images/imagedoctorai.png';
import { UserContext } from '../../context/UserContext'; // Import UserContext

const Register = () => {
    const { setUser } = useContext(UserContext); 
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errMessage, setErrMessage] = useState('');
    const [redirectToHome, setRedirectToHome] = useState(false);
    const [redirectLogin, setRedirectLogin] = useState(false);
    const history = useHistory(); 

    const handleOnChange = (e, field) => {
        switch (field) {
            case 'firstName':
                setFirstName(e.target.value);
                break;
            case 'lastName' :
                setLastName(e.target.value);
                break;
            case 'email':
                setEmail(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            case 'confirmPassword':
                setConfirmPassword(e.target.value);
                break;
            default:
                break;
        }
    };

    const handleShowHidePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleShowHideConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleRegister = async () => {
        setErrMessage('');
        if (!firstName ) {
            setErrMessage('Please enter your first name.');
            return;
        }
        if (!lastName ) {
            setErrMessage('Please enter your last name.');
            return;
        }
        if (!email ) {
            setErrMessage('Please enter your email.');
            return;
        }
        if (!password){
            setErrMessage('Please enter your password.');
            return;
        }
        if (!confirmPassword ) {
            setErrMessage('Please confirm password.');
            return;
        }
        if (password !== confirmPassword ) {
            setErrMessage('Password not match.');
            setConfirmPassword("");
            return;
        }
        try {
            const response = await handleRegisterApi(firstName, lastName, email, password);

            if (response && response.errCode === 0) {
                setUser(prevUser => ({ ...prevUser, email }));
                history.push('/home');
            } else {
                setErrMessage(response.message);
            }
        } catch (error) {
            setErrMessage(error.errMessage);
        }
    };

    const handleToLogin = () => {
        setRedirectLogin(true);
    };

    if (redirectLogin) {
        return <Redirect to="/login" />;
    }

    return (
        <div className="grid-container">
            <div className="grid-item-1">
                <img src={image} alt="Description of image" width="700" height="100%" />
            </div>
            <div className="grid-item-2">
                <div className="register-container">
                    <div className="register-content">
                        <div className="register-title">Register</div>
                        <div className="form-group">
                            <label>First Name:</label>
                            <input
                                type="text"
                                className="register-input"
                                placeholder="Enter your first name"
                                value={firstName}
                                onChange={(e) => handleOnChange(e, 'firstName')}
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name:</label>
                            <input
                                type="text"
                                className="register-input"
                                placeholder="Enter your last name"
                                value={lastName}
                                onChange={(e) => handleOnChange(e, 'lastName')}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                className="register-input"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => handleOnChange(e, 'email')}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <div className="register-password">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="register-input"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => handleOnChange(e, 'password')}
                                />
                                <span className="show-password" onClick={handleShowHidePassword}>
                                    {showPassword ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
                                </span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Confirm Password:</label>
                            <div className="register-password">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    className="register-input"
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => handleOnChange(e, 'confirmPassword')}
                                />
                                <span className="show-password" onClick={handleShowHideConfirmPassword}>
                                    {showConfirmPassword ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
                                </span>
                            </div>
                        </div>
                        <div style={{ color: 'red' }}>
                            {errMessage}
                        </div>
                        <button className="btn-register" onClick={handleRegister}>Register</button>
                        <button className="btnn-login" onClick={handleToLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Register };
