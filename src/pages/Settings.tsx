import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/nav/Navbar';


const Settings: React.FC = () => {
    const state = useSelector(state => state.auth);
    console.log(state)
    const [newPicture, setNewPicture] = useState<string>('');

    const handlePictureChange = () => {
        if (newPicture.trim() !== '') {
            onPictureChange(newPicture);
            setNewPicture('');
        } else {
            alert('Please select a valid picture!');
        }
    };

    return (
        <>
            <Navbar />
            <div className='container mx-auto'>
                <img src={state?.avatar} alt="Current Profile Picture" />
                <input
                    type="text"
                    value={newPicture}
                    placeholder="Enter new picture URL"
                    onChange={(e) => setNewPicture(e.target.value)}
                />
                <button onClick={handlePictureChange}>Change Picture</button>
            </div>
        </>
    );
};

export default Settings;
