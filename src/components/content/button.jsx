import React, { useState } from 'react';
import '../css/content.css'


export const Btn = () =>{
  const [selectedButton, setSelectedButton] = useState('all');

  const changeBackgroundColorBtn = (id) => {
    setSelectedButton(id);
  };

  return (
    <div className="btn">
      <Button id="all" onClick={() => changeBackgroundColorBtn("all")} selected={selectedButton === "all"}>Tất cả</Button>
      <Button id="musicbtn" onClick={() => changeBackgroundColorBtn("musicbtn")} selected={selectedButton === "musicbtn"}>Âm nhạc</Button>
      <Button id="gaming" onClick={() => changeBackgroundColorBtn("gaming")} selected={selectedButton === "gaming"}>Trò chơi</Button>
      <Button id="live" onClick={() => changeBackgroundColorBtn("live")} selected={selectedButton === "live"}>Trực tiếp</Button>
      <Button id="cartoon" onClick={() => changeBackgroundColorBtn("cartoon")} selected={selectedButton === "cartoon"}>Hoạt hình</Button>
      <Button id="game-action-adventure" onClick={() => changeBackgroundColorBtn("game-action-adventure")} selected={selectedButton === "game-action-adventure"}>Trò chơi hành động phiêu lưu</Button>
      <Button id="recently" onClick={() => changeBackgroundColorBtn("recently")} selected={selectedButton === "recently"}>Mới tải lên gần đây</Button>
      <Button id="new-proposal" onClick={() => changeBackgroundColorBtn("new-proposal")} selected={selectedButton === "new-proposal"}>Đề xuất mới</Button>
    </div>
  );
}

function Button({ id, onClick, selected, children }) {
  return (
    <button
      id={id}
      className={selected ? "action-content-btn-selected" : "action-content-btn"}
      onClick={onClick}
    >
      {children}
    </button>
  );
}


