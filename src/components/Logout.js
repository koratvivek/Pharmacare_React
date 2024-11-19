import React from 'react';
import { logout } from '../api';
import { useNavigate } from 'react-router-dom';

const Logout = ({ token, clearToken }) => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logout(token);
            localStorage.removeItem('authToken');
            clearToken();
            navigate('/login');
            console.log('Logged out successfully');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return <button onClick={handleLogout}>Log Out</button>;
};

export default Logout;
