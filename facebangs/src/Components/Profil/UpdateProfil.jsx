import React from 'react';
import UpdateAvatar from './UpdateAvatar';
import UpdateBio from './UpdateBio';
import '../Profil/UpdateProfil.css'

const UpdateProfil = () => {
    return (
        <div className='body-profil'>
            <UpdateAvatar />
            <UpdateBio />
        </div>
    );
};

export default UpdateProfil;