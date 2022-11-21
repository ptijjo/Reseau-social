import React from 'react';
import { useDispatch } from 'react-redux';
import Mur from '../Components/Mur/Mur';
import Navbar from '../Components/Navbar/Navbar';
import NotAuth from '../Components/NotAuth/NotAuth';
import { getUser } from '../REDUX/actions/user.actions';
import { getUsers } from '../REDUX/actions/users.actions';
import '../Styles/home/home.css';


const Home = () => {

    const token = JSON.parse(localStorage.getItem("token"));


    const dispatch = useDispatch();

    if (token === null) {
        return (<NotAuth />)
    }

    dispatch(getUser());
    dispatch(getUsers())


    return (
        <div className='home'>
            <Navbar />
            <div className='body'>
                <div style={{ width: "20%", position: "fixed", top: "10%" }}>je ne sais pas</div>
                <Mur />
                <div style={{ width: "20%", position: "fixed", left: "90%", top: "10%" }}>Followers</div>
            </div>
        </div>

    );
};

export default Home;