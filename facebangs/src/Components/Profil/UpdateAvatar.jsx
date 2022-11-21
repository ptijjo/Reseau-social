
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAvatar } from '../../REDUX/actions/user.actions';


const UpdateAvatar = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.userReducer);
    const [photo, setPhoto] = useState("");



    const HandleUpdate = (event) => {
        event.preventDefault();


        const data = new FormData();
        data.append("avatar", photo);

        dispatch(updateAvatar(data, user.Id));

    }

    return (
        <div>
            <img src={user.avatar} alt="avatar" className='profil-avatar' />

            <form onSubmit={HandleUpdate}>
                <label htmlFor="avatar"> Changer d'avatar</label>
                <input type="file" id='avatar' name='avatar' style={{ display: "none" }} onChange={(e) => setPhoto(e.target.files[0])} />

                <input type="submit" value="Envoyer" />

            </form>

        </div>
    );
};

export default UpdateAvatar;