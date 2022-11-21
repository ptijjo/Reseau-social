import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { get_user } from '../Endpoints';


const UpdateBio = () => {
    const user = useSelector(state => state.userReducer)
    const [bio, setBio] = useState("");

    const [winbio, setWinbio] = useState(false);

    const majbio = document.getElementById("update-bio");

    useEffect(() => {
        axios
            .get(get_user + user.Id,
                {
                    headers: {
                        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                    }
                })
            .then(res => setBio(res.data.bio))
            .catch(error => console.log(error))
    }, [user.Id, bio])

    const HandleUpdate = () => {
        console.log("J'ai cliqué sur updatebio")
        setWinbio(true)

    }

    const HandleBio = () => {
        console.log("j'ai update")
    }

    if (winbio) {
        majbio.innerHTML =
            ` <div>
                <input type="text" onChange={(e) => console.log(e.target.value)} />
                <input type="button" value="Update" onClick=${HandleBio} />
            </div>`
    }



    return (
        <div>
            <h3>Bio</h3>
            <span>{bio}</span>
            <div id='update-bio'></div>
            <input type="button" value="Modifier" onClick={HandleUpdate} />
        </div>
    );
};

export default UpdateBio;