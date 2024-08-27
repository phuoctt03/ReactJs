import React, { useState } from 'react';
import '../css/form.css';
import { addVideo } from '../function/api';

export const AddVideo = () => {
    const [src, setSrc] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await addVideo(src, name);
            console.log(response);
            alert('Tạo video thành công.')        
        } catch (error) {
            console.error('Error signing up:', error);
            alert('Tạo video không thành công. Vui lòng thử lại sau.');
        }
        console.log('Submitted:', { src, name });
        setSrc('');
        setName('');
    };

    return (
        <div>
        <div id="popupForm">
            <h2>Add Video</h2>
            <form id="videoForm" onSubmit={handleSubmit}>
                <label htmlFor="src">Src:</label><br />
                <input
                    type="text"
                    id="src"
                    name="src"
                    value={src}
                    onChange={(e) => setSrc(e.target.value)}
                    required
                /><br />
                <label htmlFor="name">Name:</label><br />
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                /><br /><br />
                <button type="submit">Submit</button>
            </form>
        </div>
        </div>
    );
};

export default AddVideo;
