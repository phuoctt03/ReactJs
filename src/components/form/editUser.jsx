import React, { useState, useEffect } from 'react';
import '../css/editform.css';
import { editUser } from '../function/api';

export const EditUser = ({ idUser, UserEdit }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        if (UserEdit) {
            setUsername(UserEdit.Username || '');
            setPassword(UserEdit.PasswordHash || '');
            setEmail(UserEdit.Email || '');
            setRole(UserEdit.Role || '');
        }
    }, [UserEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const User = {
            id: idUser,
            username: username,
            password: password,
            email: email,
            role: role
        };
        try {
            const response = await editUser(User);
            console.log(response);
            alert(response);

        } catch (error) {
            console.error('Error editname:', error);
            alert('Sửa không thành công. Vui lòng thử lại sau.');
        }
        console.log('Submitted:', { username, password, email, role });

        setUsername('');
        setPassword('');
        setEmail('');
        setRole('');
    };

    return (
        <div>
            <div id="edit-form">
                <h2>Edit User</h2>
                <form id="editForm" onSubmit={handleSubmit}>
                    <label htmlFor="edit-username">Username:</label><br />
                    <input
                        type="text"
                        id="edit-username"
                        name="edit-username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    /><br />
                    <label htmlFor="edit-pass">Password:</label><br />
                    <input
                        type="password"
                        id="edit-pass"
                        name="edit-pass"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    /><br /><br />
                    <label htmlFor="edit-email">Email:</label><br />
                    <input
                        type="email"
                        id="edit-email"
                        name="edit-email"
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

export default EditUser;
