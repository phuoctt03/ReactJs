import axios from 'axios';
const baseURL = 'https://nestjs-xkl8.onrender.com/users'; 

const resetpass = async (username, password, email) => {
  try {
    const newUser = {
      username: username,
      password: password,
      email: email
    };

    const response = await axios.post(`${baseURL}/repass`, newUser);
    return response.data; 

  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};

export default resetpass;
