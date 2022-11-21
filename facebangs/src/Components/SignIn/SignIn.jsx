import React from 'react';
import '../SignIn/SignIn.css';
import axios from 'axios';
import { useState } from 'react';
import { login } from '../Endpoints';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const home = useNavigate();


    const HandleLogin = (e) => {
        e.preventDefault();

        const erreur = document.getElementById('Error')

        axios({
            method: "post",
            url: `${login}`,
            data: {
                email,
                password,
            }
        })
            .then(res => {

                if (res.data.token === undefined) {
                    erreur.innerHTML = res.data.message;
                    return
                }
                localStorage.setItem("token", JSON.stringify(res.data.token));
                home("/home");
            })
            .catch(error => console.log(error))



    }

    return (

        <form action="" onSubmit={HandleLogin} className="form-Sign">
            <label htmlFor="email" >Email</label> <br />
            <input type="email" id='email' className='input' onChange={(e) => { setEmail(e.target.value) }} value={email} /><br />


            <label htmlFor="password">Mot de passe</label> <br />
            <input type="password" id="password" className='input' onChange={(e) => { setPassword(e.target.value) }} value={password} /> <br />

            <div id='Error' className='msg-erreur'></div>
            <br />


            <input type="submit" value="Connection" className='btn' />

        </form>

    );
};

export default SignIn;