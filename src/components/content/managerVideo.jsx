import axios from 'axios';
import '../css/content.css';
import { useEffect, useState } from 'react';
import { formatViews, timeAgo } from '../function/content';
import { delVideo } from '../function/api';
import { Btn } from './button';
import { EditVideo } from '../form/editVideo';

export const Playlist = ({keySearch}) => {
  const [playList, setPlayList] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [idVideo, setIdVideo] = useState(0);
  const [editVideo, setEditVideo] = useState({});

  const editbtn = (id, editVideo) => {
    setEditVideo(editVideo);
    setIdVideo(id);
    setIsVisible(!isVisible);
  };

  const handleVideoClick = async (id) => {
    try {
      axios.post(`https://nestjs-xkl8.onrender.com/playlist/${id}/views`);
    } catch (error) {
      console.error('Error updating views:', error);
    }
  };

  useEffect(() => {
    const updatePlaylist = async () => {
      try {
        let response = await axios.get('https://nestjs-xkl8.onrender.com/playlist/');
        const sortedPlaylist = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
  
        const filteredPlaylist = keySearch
          ? sortedPlaylist.filter(video =>
              video.name.toLowerCase().includes(keySearch.toLowerCase())
            )
          : sortedPlaylist;
  
        setPlayList(filteredPlaylist);
      } catch (error) {
        console.error('Error updating playlist:', error);
      }
    };
  
    updatePlaylist();

    const intervalId = setInterval(updatePlaylist, 500);

    return () => clearInterval(intervalId);
  }, [keySearch]);

  const renderVideo = (list, index) => (
    <div key={index} className="video-wrapper">
      <iframe
        src={list.src}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="description">
        <img src={`${list.avtUser}`} alt="Avatar" />
        <div className="des">
          <div className="name" onClick={() => handleVideoClick(list.id)} title= {list.name}>{list.name}</div>
          <div className="author">{list.author}</div>
          <div className="late">
            <div className="watched">{formatViews(list.watched)} lượt xem</div>
            <div className="date">• {timeAgo(list.date)}</div>
          </div>
        </div>
        <div className="change" onClick={ () => editbtn(list.id, list) }>Sửa</div>
        <div className="delete" onClick={ () => delVideo(list.id) }>Xóa</div>
      </div>
    </div>
  );

  return (
    <div className="content">
      <Btn />
      <div className="video">
        {playList.map((list, index) => renderVideo(list, index))}
      </div>
      <div className={`edit-video ${isVisible ? 'visible' : ''}`}>
        <div id="overlay" onClick={() => editbtn(0)}></div>
        <EditVideo idVideo={idVideo} VideoEdit={editVideo}/>
      </div>
    </div>
  );
};
