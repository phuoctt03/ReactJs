import React, { useState } from 'react';
import resetpass from '../function/repass';
import { IonIcon } from '@ionic/react';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';

import './style.css'
export const ForgetPass = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [checkPasswordType, setCheckPasswordType] = useState('password');

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  const toggleCheckPasswordVisibility = () => {
    setCheckPasswordType(checkPasswordType === 'password' ? 'text' : 'password');
  };

  const checkPasswordMatch = () => {
    if (password === checkPassword) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkPasswordMatch()) {
      alert('Mật khẩu không khớp. Vui lòng kiểm tra lại.');
      return;
    }
    
    try {
      const response = await resetpass(username, password, email);
      alert(response);

      if (response === 'Đổi mật khẩu thành công') {
        window.location.replace("/signin");
      }

    } catch (error) {
      console.error('Error resetting password:', error);
      alert('Đã xảy ra lỗi khi đặt lại mật khẩu.');
    }
  };

  return (
    <section className='pageAccount'>
      <div className="background">
        <div className="login">
          <h1>Đặt lại mật khẩu</h1>
          <form onSubmit={handleSubmit}>
            <div className="group">
              <input
                type="text"
                id="username"
                placeholder="Tên người dùng"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="group">
              <input
                type={passwordType}
                id="password"
                placeholder="Mật khẩu mới"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <IonIcon
                icon={passwordType === 'password' ? eyeOutline : eyeOffOutline}
                onClick={togglePasswordVisibility}
                style={{ cursor: 'pointer', marginRight: '15px', fontSize: '20px' }}
              />
            </div>
            <div className="group">
              <input
                type={checkPasswordType}
                id="checkpassword"
                placeholder="Nhập lại mật khẩu"
                value={checkPassword}
                onChange={(e) => setCheckPassword(e.target.value)}
                onInput={checkPasswordMatch}
              />
              <IonIcon
                icon={checkPasswordType === 'password' ? eyeOutline : eyeOffOutline}
                onClick={toggleCheckPasswordVisibility}
                style={{ cursor: 'pointer', marginRight: '15px', fontSize: '20px' }}
              />
            </div>
            <div className="group">
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="signIn">
              <button type="submit">Đặt lại mật khẩu</button>
            </div>
          </form>
          <div className="recovey">
            <p>
              Quay lại đăng nhập? <a href="/signin">Đăng nhập</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgetPass;