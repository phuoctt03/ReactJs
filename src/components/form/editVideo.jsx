import '../css/editform.css';
import { useEffect, useState } from 'react';
import { editVideo } from '../function/api';

export const EditVideo = ({idVideo, VideoEdit}) => {
    const [name, setName] = useState('');

    useEffect(() => {
        if (VideoEdit) {
            setName(VideoEdit.name || '');
        }
    }
    , [VideoEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newName = {
            name: name,
            id: idVideo
        };
        try {
            const response = await editVideo(newName);
            console.log(response);
            alert(response);

        } catch (error) {
            console.error('Error editname:', error);
            alert('Sửa không thành công. Vui lòng thử lại sau.');
        }
        console.log('Submitted new name:', newName);

        setName('');   
    }

    return (
        <div>
        <div id="changeForm">
            <h2>Change Name Video</h2>
            <form id="chanForm" onSubmit={handleSubmit}>
                <label htmlFor="changeName">Name:</label><br />
                <input
                    type="text"
                    id="changeName"
                    name="changeName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                /><br /><br />
                <button type="submit" id="changeNamesubmit">Submit</button>
            </form>
        </div>
        </div>
    );
};

export default EditVideo;
