import React from 'react';
import "../Styles/Connection/Connection.css";
import LOGO from "../Assets/LOGO1.jpg"
import { useState } from 'react';
import SignIn from '../Components/SignIn/SignIn';
import SignUp from '../Components/SignUp/SignUp';

const Connection = () => {

    const [signIn, setSignIn] = useState(true)
    const [signUp, setSignUp] = useState(false)

    const HandleSign = (e) => {

        if (e.target.id === "connecter") {
            setSignIn(true)
            setSignUp(false)
        }

        else if (e.target.id === "inscrire") {
            setSignIn(false)
            setSignUp(true)

        }
    }

    return (
        <div className='Connection'>
            <div className="log">
                <ul className='Sign'>
                    <li onClick={HandleSign} className={signIn ? "signli-select" : "signli"} id="connecter">  Connection  </li>
                    <li onClick={HandleSign} className={signUp ? "signli-select" : 'signli'} id="inscrire"> S'incrire </li>
                </ul>

                {signIn && <SignIn />}
                {signUp && <SignUp />}
            </div>


            <img src={LOGO} alt="Logo facebangs" className='logo' />
        </div>
    );
};

export default Connection;