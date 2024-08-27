import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/table.css';
import { delUser } from '../function/api';
import EditUser from '../form/editUser';

export const Users = () => {
  const [users, setUser] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [editUser, setEditUser] = useState({});
  const [idUser, setIdUser] = useState(0);

  useEffect(() => {
    const updateUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const options = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        let response = await axios.get('http://localhost:3002/users/', options);
        if (response.data[0].UserID === undefined) {
          response.data = response.data.map((user) => {
            return {
              UserID: user.id,
              Username: user.Username,
              PasswordHash: user.PasswordHash,
              Email: user.Email,
              Role: user.Role,
            };
          });
        }
        setUser(response.data); 
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.clear();
        }
        console.error('Error fetching users:', error);
        window.location.replace('/signin');
      }
    };

    const interval = setInterval(() => {
      updateUser();
    }, 500); 

    return () => clearInterval(interval); 
  }, []);

    const editbtn = (id, editUser) => {
      setIdUser(id);
      setEditUser(editUser);
      setIsVisible(!isVisible);
    }

    const renderUser = (users) => {
        if (!Array.isArray(users) || users.length === 0) {
          return null; 
        }
      
        return (
          <table>
            <thead>
              <tr>
                {Object.keys(users[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
                <th>Sửa</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.UserID}>
                  {Object.values(user).map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                  <td>
                    <button className="edit-btn" onClick={() => editbtn(user.UserID, user)}>
                      Sửa
                    </button>
                  </td>
                  <td>
                    <button className="delete-btn" onClick={() => delUser(user.UserID)}>
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      };
      
    return (
      <div className="container">
        {renderUser(users)}
        <div className={`edit-video ${isVisible ? 'visible' : ''}`}>
          <div id="overlay" onClick={() => editbtn(0)}></div>
          <EditUser idUser={idUser} UserEdit={editUser}/>
      </div>
      </div>
    );  
};
