import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../css/choseAvt.css'; // Import CSS file for styling

let avtUrl = "https://nestjs-xkl8.onrender.com/AvtUser"
const token = localStorage.getItem('token');
const options = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
let id = localStorage.getItem('userId');

const ChoseAvt = () => {
  const fileInputRef = useRef(null);
  const [avatars, setAvatars] = useState([]);
  const [selectedAvt, setSelectedAvt] = useState(null);
  const [avatarsUser, setAvatarsUser] = useState([]);

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const response = await axios.get(avtUrl);
        setAvatars(response.data);
      } catch (error) {
        console.error('Error fetching avatars:', error);
      }
      try {
        const responseUser = await axios.get(`${avtUrl}/${localStorage.getItem('userId')}`, options);
        setAvatarsUser(responseUser.data);
      } catch (error) {
        console.error('Error fetching avatarsUser:', error);
      }
    };

    fetchAvatars();
  }, []);

  const handleAvtClick = (avatar) => {
    setSelectedAvt(avatar);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files;
    if (file) {
      for (let i = 0; i < file.length; i++) {
        const formData = new FormData();
        formData.append('file', file[i]);
        const response = await axios.post(`${avtUrl}/upload/${id}`, formData, options);
        if (response.data === "Tệp đã tồn tại") {
          alert('Tệp đã tồn tại');
          return;
        }
        let url = response.data.file.filePath;
        localStorage.setItem('avtUser', url);
      }
      alert('Upload avatar thành công');
      window.location.reload();
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa avatar này không?');
    if (confirmDelete) {
      try {
        const response = await axios.delete(`${avtUrl}/${id}?avatarUrl=${selectedAvt.avatarUrl}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });
        if (selectedAvt.avatarUrl === localStorage.getItem('avtUser')) {
          localStorage.setItem('avtUser', response.data.file.filePath);
        }
        console.log('Xóa thành công', response.data);
        alert('Xóa avatar thành công');
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error('Lỗi xác thực: Token có thể đã hết hạn hoặc không hợp lệ.');
        } else {
          console.error('Lỗi:', error.message);
        }
      }
      setSelectedAvt(null);
      window.location.reload();
    }
  };

  const changeAvt = async () => {
    let body = {
      avatarUrl: selectedAvt.avatarUrl,
    };
    const response = await axios.patch(`${avtUrl}/${id}`, body, options);
    if (response.status !== 200) {
      console.error('Error updating avatar:', response);
      alert('Error updating avatar');
      return;
    }
    alert('Thay đổi avatar thành công');
    localStorage.setItem('avtUser', selectedAvt.avatarUrl);
    window.location.reload();
  };

  return (
    <div className="avatar-selector">
       <div className="header">
        <h2>Select Your Avatar</h2>
        <button className="upload-btn" type="button" onClick={handleUploadClick}>
          Upload Avatars
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
      <div className="avatar-list">
        {avatars.map((avatar) => (
          <div
            key={avatar.id}
            className={`avatar-item ${selectedAvt === avatar ? 'selected' : ''}`}
            onClick={() => handleAvtClick(avatar)}
          >
            <img src={avatar.avatarUrl} alt="" className="avatar-image" />
          </div>
        ))}
        {avatarsUser.map((avatar) => (
          <div
            key={avatar.id}
            className={`avatar-item ${selectedAvt === avatar ? 'selected' : ''}`}
            onClick={() => handleAvtClick(avatar)}
          >
            <img src={avatar.avatarUrl} alt="" className="avatar-image" />
          </div>
        ))}
      </div>
      {selectedAvt && (
        <>
          <div className="selected-avatar">
            <h3>Selected Avatar:</h3>
            <img src={selectedAvt.avatarUrl} className="avatar-image-large" alt="selected avatar" />
          </div>
          {(avatarsUser.includes(selectedAvt) || localStorage.getItem('role')==='admin') && (
            <button className="deletebtn" onClick={() => handleDelete()}>Delete</button>
          )}
          <button className="savebtn" onClick={changeAvt}>Save</button>
        </>
      )}
    </div>
  );
};

export default ChoseAvt;
