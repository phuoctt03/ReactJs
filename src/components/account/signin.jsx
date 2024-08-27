import React, { useState } from 'react';
import './style.css';
import { signIn, validateUsernamePassword } from '../function/signin';
import { IonIcon } from '@ionic/react';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';

export const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  const handleSignIn = async () => {
    try {
      if (!validateUsernamePassword(username, password)) {
        return; 
      }
      const response = await signIn(username, password);
      
      if (response === 'Đăng nhập thành công.') {
        window.location.replace('/home');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      alert('Đăng nhập không thành công. Vui lòng thử lại sau.');
    }
  };

  return (
    <section className='pageAccount'>
      <div className="background">
        <div className="login">
          <h1>Đăng nhập</h1>
          <div className="group">
            <input
              type="text"
              id="username"
              placeholder="Tên người dùng"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="group">
            <input
              type={passwordType}
              id="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <IonIcon
                icon={passwordType === 'password' ? eyeOutline : eyeOffOutline}
                onClick={togglePasswordVisibility}
                style={{ cursor: 'pointer', marginRight: '15px', fontSize: '20px' }}
              />
          </div>
          <div className="recovey">
            <p>
              Quên mật khẩu? <a href="/repass">Đặt lại mật khẩu</a>
            </p>
          </div>
          <div className="signIn">
            <button type="submit" onClick={handleSignIn}>
              Đăng nhập
            </button>
          </div>
          <div className="register">
            Chưa có tài khoản? <a href="/signup">Đăng ký</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;