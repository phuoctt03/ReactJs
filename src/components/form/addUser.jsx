// addUser.jsx

import React, { useState } from 'react';
import '../css/form.css';
import { signUp } from '../function/signup'; 
import { validateUsernamePassword } from '../function/signin';

export const AddUser = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');  

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!validateUsernamePassword(username, password)) {
                return; 
            }
        
            const response = await signUp(username, password, email, role);
        
            alert(response);

        } catch (error) {
            console.error('Error signing up:', error);
            alert('Đăng ký không thành công. Vui lòng thử lại sau.');
        }
        
        console.log('Submitted:', { username, password, email, role });

        setUsername('');
        setPassword('');
        setEmail('');
        setRole('');
    };

    return (
        <div>
            <div id="popupForm">
                <h2>Add User</h2>
                <form id="usersForm" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label><br />
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    /><br />
                    <label htmlFor="pass">Password:</label><br />
                    <input
                        type="password"
                        id="pass"
                        name="pass"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    /><br /><br />
                    <label htmlFor="email">Email:</label><br />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    /><br /><br />
                    <label htmlFor="role">Role:</label><br />
                    <select
                        id="role"
                        name="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select a role</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select><br /><br />
                    <button type="submit" id="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddUser;
