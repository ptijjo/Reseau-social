import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost, createPostPicture, getPosts } from '../../REDUX/actions/posts.actions';
import "../CreatePost/CreatePost.css"

const CreatePost = () => {
    const [photo, setPhoto] = useState(null);
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();

    /* const data = new FormData();
     data.append("message", message);
     data.append("picture", photo);*/

    console.log(photo)

    const Handlesubmit = (e) => {
        e.preventDefault();

        if (photo === null) {

            dispatch(createPost(message));
            dispatch(getPosts());
            setMessage("");
            setPhoto(null)

        }

        else {
            const data = new FormData();
            data.append("message", message);
            data.append("picture", photo);
            dispatch(createPostPicture(data));
            dispatch(getPosts());
            setMessage("");
            setPhoto(null)
        }


    }


    return (
        <form onSubmit={Handlesubmit} className="create-post">
            <div className='sans-photo'>
                <input type="text-area" onChange={(e) => setMessage(e.target.value)} value={message} required className="input-message" />
                <input type="submit" value="Publier" className='btn-post' />
            </div>
            <>
                <label htmlFor="photo" className='icone-picture'> <i className="fa-solid fa-image"></i></label>
                <p>Photos</p>
                <input type="file" name="photo" id="photo" onChange={(e) => setPhoto(e.target.files[0])} style={{ display: "none" }} />
            </>

        </form>
    );
};

export default CreatePost;