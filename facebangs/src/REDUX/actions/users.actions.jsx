import axios from "axios"
import { get_users } from "../../Components/Endpoints"


export const GET_USERS = "GET_USERS"

export const getUsers = () => {
    return (dispatch => {
        return axios
            .get(get_users, {
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem('token'))
                }
            })
            .then(user => {
                dispatch({
                    type: GET_USERS,
                    payload: user.data.user,
                })
            })
            .catch(error => console.log(error))
    })
}