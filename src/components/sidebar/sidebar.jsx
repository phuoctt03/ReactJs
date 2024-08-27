import '../css/sidebar.css';

export const Sidebar = () => {

    const changeBackgroundColor = (event) => {

        const buttons = document.querySelectorAll('.group div');
        buttons.forEach(button => {
            button.style.backgroundColor = '';
        });

        event.currentTarget.style.backgroundColor = 'rgb(126, 126, 126)';
    };

    return (
        <div className="side-bar">
            <div className="group">
                <div className="home" onClick={changeBackgroundColor} style={{ backgroundColor: 'rgb(126, 126, 126)' }}>
                    <img src="/images/home.png" alt="Home Icon" />
                    <div className="text" >Trang chủ</div>
                </div>
                <div className="shorts" onClick={changeBackgroundColor}>
                    <img src="/images/shorts.png" alt="Shorts Icon" />
                    <div className="text">Shorts</div>
                </div>
                <div className="subscribe" onClick={changeBackgroundColor}>
                    <img src="/images/playlist.png" alt="Subscribe Icon" />
                    <div className="text">Kênh đăng ký</div>
                </div>
            </div>
            <div className="group">
                <h3 className="title">Bạn</h3>
                <div className="video-da-xem" onClick={changeBackgroundColor}>
                    <img src="/images/counterclockwise-rotation.png" alt="Video Đã Xem Icon" />
                    <div className="text">Video đã xem</div>
                </div>
                <div className="playlist" onClick={changeBackgroundColor}>
                    <img src="/images/playlist (1).png" alt="Danh Sách Phát Icon" />
                    <div className="text">Danh sách phát</div>
                </div>
                <div className="xem-sau" onClick={changeBackgroundColor}>
                    <img src="/images/time.png" alt="Xem Sau Icon" />
                    <div className="text">Xem sau</div>
                </div>
                <div className="like" onClick={changeBackgroundColor}>
                    <img src="/images/like.png" alt="Video Đã Thích Icon" />
                    <div className="text">Video đã thích</div>
                </div>
            </div>
            <div className="group">
                <h3 className="title">Khám phá</h3>
                <div className="trending" onClick={changeBackgroundColor}>
                    <img src="/images/trending.png" alt="Thịnh Hành Icon" />
                    <div className="text"> Thịnh hành</div>
                </div>
                <div className="music" onClick={changeBackgroundColor}>
                    <img src="/images/music.png" alt="Âm Nhạc Icon" />
                    <div className="text">Âm nhạc</div>
                </div>
                <div className="game" onClick={changeBackgroundColor}>
                    <img src="/images/console.png" alt="Trò Chơi Icon" />
                    <div className="text">Trò chơi</div>
                </div>
                <div className="news" onClick={changeBackgroundColor}>
                    <img src="/images/news-feed.png" alt="Tin Tức Icon" />
                    <div className="text">Tin tức</div>
                </div>
                <div className="sports" onClick={changeBackgroundColor}>
                    <img src="/images/trophy.png" alt="Thể Thao Icon" />
                    <div className="text">Thể thao</div>
                </div>
            </div>
            <div className="group">
                <div className="setting" onClick={changeBackgroundColor}>
                    <img src="/images/setting.png" alt="Cài Đặt Icon" />
                    <div className="text">Cài đặt</div>
                </div>
                <div className="report" onClick={changeBackgroundColor}>
                    <img src="/images/red-flag.png" alt="Nhật Ký Báo Cáo Icon" />
                    <div className="text">Nhật ký báo cáo</div>
                </div>
                <div className="question" onClick={changeBackgroundColor}>
                    <img src="/images/question.png" alt="Trợ Giúp Icon" />
                    <div className="text">Trợ giúp</div>
                </div>
                <div className="feedback" onClick={changeBackgroundColor}>
                    <img src="/images/feedback.png" alt="Phản Hồi Icon" />
                    <div className="text">Phản hồi</div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
