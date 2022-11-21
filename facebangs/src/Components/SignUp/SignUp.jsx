import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { signup } from '../Endpoints';

const SignUp = () => {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorSignup, setErrorSignup] = useState("")
    const errorEmail = document.getElementById("errorEmail");
    const errorPassword = document.getElementById("errorPassword");


    const emailValidator = (i) => {
        return /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/.test(i)
    }

    // Mot de passe avec 6 caract 1Maj, 1Chiffre et 1caractSpecial
    const passwordValidator = (i) => {
        return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{6})$/.test(i);
    }

    const HandleSignUp = (e) => {
        e.preventDefault()

        //Controle du formulaire

        if (password.trim().length === 0 || email.trim().length === 0 || nom.trim().length === 0 || prenom.trim().length === 0) {
            return;
        }

        if (!emailValidator(email)) {
            return errorEmail.innerHTML = "Adresse e-mail incorrect";
        }

        /* if (!passwordValidator(password)) {
             return errorPassword.innerHTML = "Mot de passe doit contenir au moins 6 caractères dont 1 majuscle, 1 chiffre et un caractère spécial";
         }*/




        axios({
            method: "post",
            url: `${signup}`,
            data: {
                nom,
                prenom,
                email,
                password,
            }
        })
            .then(resultat => {
                setErrorSignup(resultat.data.message);


            })
            .catch(error => console.log(error))

        setNom("");
        setPrenom("");
        setEmail("");
        setPassword("");

        if (errorSignup !== undefined) { return errorPassword.innerHTML = errorSignup }
    }



    return (
        <form action="" onSubmit={HandleSignUp} className="form-Sign">
            <label htmlFor="nom">Nom</label> <br />
            <input type="text" id='nom' className='input' value={nom} onChange={(e) => setNom(e.target.value)} required />
            <br />
            <label htmlFor="prenom">Prénom</label> <br />
            <input type="text" id='prenom' className='input' value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
            <br />
            <label htmlFor="email">E-mail</label> <br />
            <input type="email" id='email' className='input' value={email} onChange={(e) => setEmail(e.target.value)} required />

            <div id='errorEmail'></div>

            <label htmlFor="password">Mot de passe</label> <br />
            <input type="password" id='password' className='input' value={password} onChange={(e) => setPassword(e.target.value)} required />
            <br />
            <div id='errorPassword'></div>
            <br />
            <input type="submit" value="S'enregistrer" className='btn' />

        </form>
    );
};

export default SignUp;