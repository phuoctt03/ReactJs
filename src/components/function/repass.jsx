import axios from 'axios';
const baseURL = 'http://localhost:3002/users'; 

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
