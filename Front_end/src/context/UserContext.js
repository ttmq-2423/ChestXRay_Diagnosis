import React, { createContext, useState, useEffect } from 'react';
import { handleGetInforApi } from '../services/userService';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // Khởi tạo trạng thái người dùng từ localStorage nếu có
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : { firstName: "", lastName: "", avatar: "", email: "", created_at: "" };
    });

    // Cập nhật localStorage mỗi khi trạng thái người dùng thay đổi
    useEffect(() => {
        if (user && user.email) {
            localStorage.setItem('user', JSON.stringify(user));
        }
    }, [user]);

    useEffect(() => {
        if (user.email) {
            fetchUserInfo();
        }
    }, [user.email]);

    async function fetchUserInfo() {
        try {
            const response = await handleGetInforApi(user.email);
            setUser(response);
        } catch (error) {
            console.error('Error fetching user information:', error);
        }
    }

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
