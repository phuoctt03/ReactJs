import axios from 'axios';

const baseURL = 'http://localhost:3002/users';

export const signUp = async (username, password, email, role) => {
  try {
    const response = await axios.post(`${baseURL}/addUser`, {
      Username: username,
      PasswordHash: password,
      Email: email,
      Role: role
    });
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error; 
  }
};
