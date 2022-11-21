import axios from "axios";
import { upload_avatar, who } from "../../Components/Endpoints";


export const GET_USER = "GET_USER"; // type d'action qu'on effectue

export const getUser = () => { // Création de notre action GET_USER
    return (dispatch) => {
        return axios
            .get(who,
                {
                    headers: {
                        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                    }
                })
            .then(res => {
                dispatch({
                    type: GET_USER,
                    payload: res.data
                })
            })
            .catch(error => console.log(error))
    }

}



export const UPDATE_AVATAR = "UPDATE_AVATAR"

export const updateAvatar = (data, id) => { // création de notre action update
    return (dispatch) => {
        return axios
            .put(upload_avatar + id,
                data,
                {
                    headers: {
                        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                    }
                })
            .then(res => {
                dispatch({
                    type: UPDATE_AVATAR,
                    payload: res.data.avat.avatar

                })
            })
            .catch(error => console.log(error))
    }
}



