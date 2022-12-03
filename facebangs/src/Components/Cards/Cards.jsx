import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import "../Cards/Cards.css";
import { useSelector } from "react-redux"

const Cards = (props) => {
    const post = props.post;
    const [loading, setLoading] = useState(true);
    const posts = useSelector(state => state.postsReducer);

    const HandleLike = () => {
        console.log("je like")
    }

    const HandleComment = () => {
        console.log("je commente")
    }

    useEffect(() => {
        if (posts !== null) {
            setLoading(false)
        }

    }, [posts])

    if (loading === true) return (<span className="loader"></span>)

    return (
        <li className="card">

            <div className='posteur-photo'>
                <img src={post.posterAvatar} alt={post.posterAvatar} className="photo-posteur" />
                <span className='posteur'>{post.posterId}</span>
            </div>

            <span className='posteur-message'>{post.message}</span>
            <img src={post.picture} alt={post.picture} className="posteur-img" />
            <div className='like-commentaire'>
                <span className='like' onClick={HandleLike}> Like ({post.like})</span>
                <span className='commentaire' onClick={HandleComment}> Commentaire ({post.nbreCommentaire})</span>
            </div>


        </li>
    );
};

export default Cards;