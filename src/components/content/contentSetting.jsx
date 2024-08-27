import React, { useEffect, useState } from 'react';
import '../css/setting.css';
import axios from 'axios';
import { delUser } from '../function/api';
import ChoseAvt from '../form/choseAvt';

const baseUserURL = 'https://nestjs-8nvm.onrender.com/users'; 
const token = localStorage.getItem('token');

export const ContentSetting = () => {
    const [userInfo, setUserInfo] = useState({
        userId: '',
        username: '',
        password: '',
        email: '',
        avtUser: ''
    });
    
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...userInfo });
    const [avatarInput, setAvatarInput] = useState('');
    const [showChoseAvt, setShowChoseAvt] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('userId') || localStorage.getItem('id');
        const username = localStorage.getItem('username');
        const email = localStorage.getItem('email');
        const avtUser = localStorage.getItem('avtUser');

        setUserInfo({
            userId: userId || '',
            username: username || '',
            password: '',
            email: email || '',
            avtUser: avtUser || ''
        });

        setFormData({
            userId: userId || '',
            username: username || '',
            password: '',
            email: email || '',
            avtUser: avtUser || ''
        });

        setAvatarInput(avtUser || '');
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            let body = {
                Username: formData.username || userInfo.username,
                PasswordHash: formData.password || '',
                Email: formData.email || userInfo.email,
            };
            body = JSON.stringify(body);
            const options = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
            const response = await axios.patch(`${baseUserURL}/${formData.userId}`, body, options);
            alert(response.data);
            if (response.data === `Người dùng với ID: ${formData.userId} đã được cập nhật thành công`) {
                localStorage.setItem('username', formData.username);
                localStorage.setItem('email', formData.email);
                setUserInfo({
                    ...formData,
                    avtUser: avatarInput
                });
            }
            setIsEditing(false);
        } catch (error) {
            if (error.response) {
                console.error('Lỗi từ server:', error.response.data);
                alert(`Lỗi từ server: ${error.response.data.error}`);
            } else if (error.request) {
                console.error('Không nhận được phản hồi từ server:', error.request);
                alert('Không nhận được phản hồi từ server.');
            } else {
                console.error('Lỗi khi thiết lập yêu cầu:', error.message);
                alert('Lỗi khi thiết lập yêu cầu.');
            }
        }
    };
    

    const handleAvatarChange = () => {
        // Hiển thị hoặc ẩn component ChoseAvt
        setShowChoseAvt(!showChoseAvt);
    };

    const handleAvatarSelect = (selectedAvatar) => {
        // Cập nhật avatar với giá trị đã chọn từ ChoseAvt
        setAvatarInput(selectedAvatar);
        setUserInfo(prev => ({
            ...prev,
            avtUser: selectedAvatar
        }));
        setShowChoseAvt(false); // Ẩn ChoseAvt sau khi chọn avatar
    };

    return (
        <div>
            <div className="content-setting">
                <div className="user-info">
                    <div className="user-avatar">
                        {userInfo.avtUser ? (
                            <img src={userInfo.avtUser} alt="Avatar" />
                        ) : (
                            <div className="default-avatar">No Avatar</div>
                        )}
                        <div className="avatar-overlay">
                            <button onClick={handleAvatarChange} className="avatar-change-button">
                                <img src="http://localhost:3000/images/camera.png" alt="Change Avatar"></img>
                            </button>
                        </div>
                    </div>
                    <div className="user-details">
                        {isEditing ? (
                            <>
                                <p>ID: {userInfo.userId}</p>
                                <br></br>
                                <label>Username:
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </label>
                                <br></br>
                                <label>Password:
                                    <input
                                        type="text"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </label>
                                <br></br>
                                <label>Email:
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </label>
                                <br></br>
                                <button onClick={handleSave} className='savebtn'>Save Changes</button>
                                <button onClick={() => delUser(localStorage.getItem('userId'))} className='deletebtn'>Delete Account</button>
                            </>
                        ) : (
                            <>
                                <p><strong>ID:</strong> {userInfo.userId}</p>
                                <p><strong>Username:</strong> {userInfo.username}</p>
                                <p><strong>Email:</strong> {userInfo.email}</p>
                                <button onClick={() => setIsEditing(true)} className='savebtn'>Edit</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {showChoseAvt && <ChoseAvt onSelect={handleAvatarSelect} />}
        </div>
    );
};

export default ContentSetting;
