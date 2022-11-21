import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Navbar/Navbar.css';
import icone from "../../Assets/icone.png"
import { useSelector } from 'react-redux';

const Navbar = () => {

    const user = useSelector((state) => state.userReducer)

    const deconnection = useNavigate();
    const home = useNavigate();
    const profil = useNavigate();


    const HandleDeco = () => {
        localStorage.clear();
        deconnection("/")
    }

    const HandleProfil = () => {

        profil("/profil/" + user.Id)

    }

    const HandleHome = () => {
        home("/home")
    }

    return (
        <div className='navbar'>
            <img src={icone} alt="logo-facebangs" className='logo-icone' onClick={HandleHome} />

            <div className='user-id'> <p className='bjr'> Bonjour</p> <p className='user' onClick={HandleProfil}> <img src={user.avatar} alt="avatar" />{user.userId}</p> </div>

            <input type="button" value="Déconnection" onClick={HandleDeco} className="btn-deco" />


        </div>
    );
};

export default Navbar;