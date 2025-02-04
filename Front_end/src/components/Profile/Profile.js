import React, { useState, useContext } from "react";
import { UserContext } from '../../context/UserContext'; 
import { format, parseISO } from 'date-fns';
import { handleAvatarUpdateApi } from '../../services/userService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Profile.css';

function Profile() {
    const { user, setUser } = useContext(UserContext); 
    const [newAvatar, setNewAvatar] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);

    // Chuyển đổi file ảnh thành base64
    const convertToBase64 = async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    // Xử lý sự kiện khi người dùng chọn một hình ảnh mới
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setNewAvatar(file);
            setShowConfirm(true);
        }
    };

    // Xử lý sự kiện khi người dùng xác nhận thay đổi avatar
    const handleAvatarUpdate = async () => {
        if (newAvatar) {
            try {
                const base64String = await convertToBase64(newAvatar);
                const response = await handleAvatarUpdateApi(user.email, base64String);

                if (response.errCode === 0) {
                    setUser(prevUser => ({ ...prevUser, avatar: base64String }));
                    toast.success('Avatar updated successfully!', {
                        position: "top-center",
                        autoClose: 2000, 
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    toast.error('Failed to update avatar.', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            } catch (error) {
                console.error('Error updating avatar:', error);
                toast.error('Error updating avatar.', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } finally {
                setShowConfirm(false);
            }
        }
    };

    const handleCancelUpdate = () => {
        setShowConfirm(false);
        setNewAvatar(null);
    };

    return (
        <div className="container">
            <h1>Profile</h1>
            <div className="profile-details">
                <img
                    src={user.avatar}
                    alt="Avatar"
                    style={{ width: '200px', height: '200px', objectFit: 'cover', margin: '10px' }}
                />
                <input type="file" accept="image/*" onChange={handleFileChange} />
                {showConfirm && (
                    <div className="confirm-dialog">
                        <p>Do you want to change your avatar?</p>
                        <button onClick={handleAvatarUpdate}>yes</button>
                        <button onClick={handleCancelUpdate}>No</button>
                    </div>
                )}
                <p><strong>First Name:</strong> {user.firstName}</p>
                <p><strong>Last Name:</strong> {user.lastName}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <a><strong>Created at: </strong> {format(parseISO(user.created_at), "HH:mm yyyy/MM/dd ")}</a>
            </div>
            <ToastContainer />
        </div>
    );
}

export { Profile };
