import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import "../Cards/Cards.css";
import { useSelector } from "react-redux"

const Cards = (props) => {
    const post = props.post;
    const [loading, setLoading] = useState(true);
    const posts = useSelector(state => state.postsReducer);


    useEffect(() => {
        if (posts !== null) {
            setLoading(false)
        }

    }, [posts])

    if (loading === true) return (<span className="loader"></span>)

    return (
        <li key={post._id} className="card">

            <div className='posteur-photo'>
                <img src={post.posterAvatar} alt={post.posterAvatar} className="photo-posteur" />
                <span className='posteur'>{post.posterId}</span>
            </div>

            <span className='posteur-message'>{post.message}</span>
            {/*<span className='posteur-picture'>*/}<img src={post.picture} alt={post.picture} className="posteur-img" />{/*</span>*/}
            <div className='like-commentaire'>
                <span> Like ({post.like})</span>
                <span> Commentaire ({post.nbreCommentaire})</span>
            </div>


        </li>
    );
};

export default Cards;