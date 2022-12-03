import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { profil } from '../Components/Endpoints';
import Navbar from '../Components/Navbar/Navbar';
import UpdateProfil from '../Components/Profil/UpdateProfil';
import { getUser } from '../REDUX/actions/user.actions';
import '../Styles/profil/profil.css';
import Connection from './Connection';

const Profil = () => {
    const dispatch = useDispatch();
    const id = useParams();
    const user = useSelector((state) => state.userReducer)
    useEffect(() => {
        axios.get(profil + id.id,
            {
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
                }
            })
            .then()
            .catch(error => console.log(error))
        dispatch(getUser())
    }, [dispatch, id.id]);

    console.log(user.Id)
    console.log(id.id)

    if (id.id !== user.Id) { return <Connection /> }

    return (
        <div className='profil'>
            <Navbar />
            <UpdateProfil />


        </div>
    );
};

export default Profil;