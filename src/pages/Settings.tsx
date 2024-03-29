import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from '../components/nav/Navbar';
import { useAuth } from '../hooks/useAuth';
import { postProfileAvatar } from '../store/features/authSlice';

const Settings: React.FC = () => {
    const { avatar, id } = useAuth();
    const [newPicture, setNewPicture] = useState<File | null>(null);
    const dispatch = useDispatch();

    const handlePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const fileList = e.target.files;
        if (fileList && fileList.length > 0) {
            const file = fileList[0];
            setNewPicture(file);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newPicture) {
            const formData = new FormData();
            formData.append('file', newPicture);

            // @ts-expect-error: ignore it
            dispatch(postProfileAvatar({ formData, id }));
            setNewPicture(null);
        }
    };

    return (
        <>
            <Navbar />
            <div className='container mx-auto flex flex-col justify-center items-center space-y-6 mt-20'>
                <img src={`http://localhost:3300/uploads/avatars/${avatar}`} alt="Current Profile Picture" className='w-[200px] h-[200px]' />
                <form onSubmit={handleSubmit} className='flex space-x-5'>
                    <input
                        type="file"
                        placeholder="Select an avatar"
                        onChange={handlePictureChange}
                        className='shadow-lg px-6 py-3'
                    />
                    <button type='submit' className='bg-blue-700 hover:bg-blue-800 rounded-lg text-white px-6 py-3'>Change Picture</button>
                </form>
            </div>
        </>
    );
};

export default Settings;
