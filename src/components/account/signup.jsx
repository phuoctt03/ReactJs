import React, { useState } from 'react';
import './style.css'; 
import { signUp } from '../function/signup'; 
import { validateUsernamePassword } from '../function/signin';
import { IonIcon } from '@ionic/react';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';

export const Signup = () => {
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

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!checkPasswordMatch()) {
      alert('Mật khẩu không khớp. Vui lòng kiểm tra lại.');
      return;
    }
    
    try {
      if (!validateUsernamePassword(username, password)) {
        return; 
      }
      const response = await signUp(username, password, email);
      alert(response);
      if (response === 'Tạo tài khoản thành công') {
        window.location.replace('/signin');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Đăng ký không thành công. Vui lòng thử lại sau.');
    }
  };

  return (
    <section className='pageAccount'>
      <div className="background">
        <div className="login">
          <h1>Đăng ký</h1>
          <form>
            <div className="group">
              <label htmlFor="username"></label>
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
                placeholder="Mật khẩu"
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
              <label htmlFor="email"></label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </form>
          <div className="signIn">
            <button type="submit" onClick={handleSignUp}>
              Đăng ký
            </button>
          </div>
          <div className="register">
            Đã có tài khoản? <a href="/signin">Đăng nhập</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;