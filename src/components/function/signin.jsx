import axios from 'axios';

const baseURL = 'https://nestjs-xkl8.onrender.com/users'; 

export const signIn = async (username, password) => {
  try {
    const response = await axios.post(`${baseURL}/checkin`, {
      username: username,
      password: password,
    });
    if (response.data === 'Mật khẩu không chính xác' || response.data === 'Người dùng không tồn tại') {
      return alert('Tên người dùng hoặc mật khẩu không đúng.');
    }
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userId', response.data.id);
    localStorage.setItem('role', response.data.role);
    localStorage.setItem('username', response.data.username);
    localStorage.setItem('email', response.data.email);
    localStorage.setItem('avtUser', response.data.avt);
    // console.log(response.data);
    return 'Đăng nhập thành công.';    
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const validateUsernamePassword = (username, password) => {
    if (!username || !password) {
      return alert('Vui lòng nhập tên người dùng và mật khẩu.');
    }

    return true;
  };
  