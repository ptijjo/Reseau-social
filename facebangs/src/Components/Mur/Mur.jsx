import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { getPosts } from '../../REDUX/actions/posts.actions';
import Cards from "../Cards/Cards";
import CreatePost from '../CreatePost/CreatePost';
import "../Mur/Mur.css";

const Mur = () => {

    const [loadPost, setLoadPost] = useState(true);
    const dispatch = useDispatch();
    const posts = useSelector(state => state.postsReducer);


    useEffect(() => {
        if (loadPost === true) {
            dispatch(getPosts());
            setLoadPost(false);
        }
    }, [dispatch, loadPost]);


    return (
        <div className='mur'>
            <CreatePost />
            {posts.length > 0 &&
                <ul className='liste-card'>
                    {posts.slice(0).reverse().map(post => (
                        <Cards post={post} />
                    ))}
                </ul>}
        </div>
    );
};

export default Mur;