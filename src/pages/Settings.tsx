import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from '../components/nav/Navbar';
import { useAuth } from '../hooks/useAuth';
import { postProfileAvatar } from '../store/features/authSlice';


const Settings: React.FC = () => {
    const { avatar, id } = useAuth();
    const [newPicture, setNewPicture] = useState<string>('');
    const dispatch = useDispatch();
    console.log(avatar)

    const handlePictureChange = (e) => {
        e.preventDefault();
        console.log(id);
        const formData = new FormData();
        formData.append('file', newPicture);

        dispatch(postProfileAvatar({ formData, id }));
    };

    return (
        <>
            <Navbar />
            <div className='container mx-auto flex flex-col justify-center items-center space-y-6 mt-20'>
                <img src={`http://localhost:3300/uploads/avatars/${avatar}`} alt="Current Profile Picture" className='w-[200px] h-[200px]' />
                <form onSubmit={handlePictureChange} className='flex space-x-5'>
                    <input
                        type="file"
                        placeholder="Select a avatar"
                        onChange={(e) => {
                            setNewPicture(e?.target?.files[0]);
                        }}
                        className='shadow-lg px-6 py-3 '
                    />
                    <button type='submit' className='bg-blue-700 hover:bg-blue-800 rounded-lg text-white px-6 py-3'>Change Picture</button>

                </form>
            </div>
        </>
    );
};

export default Settings;
