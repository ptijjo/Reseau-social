import axios from 'axios'
import { create_post, create_post_picture, get_post } from '../../Components/Endpoints';

export const GET_POSTS = "GET_POSTS";

export const getPosts = () => {
    return (dispatch) => {
        return axios
            .get(get_post,
                {
                    headers: {
                        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                    }
                })
            .then(res => {
                dispatch({
                    type: GET_POSTS,
                    payload: res.data.post,
                })
            })
            .catch(error => console.log(error))
    }

}



export const CREATE_POST = "CREATE_POST";

export const createPost = (data) => {
    return (dispatch) => {
        return axios
            .post(create_post,
                {
                    message: data,
                },
                {
                    headers: {
                        Authorization: "Bearer " + JSON.parse(localStorage.getItem('token'))
                    }
                }
            )
            .then()
            .catch(error => console.log(error))
    }
}



export const CREATE_POST_PICTURE = "CREATE_POST_PICTURE";

export const createPostPicture = (data) => {
    return (dispatch) => {
        return axios
            .post(create_post_picture, data,
                {
                    headers: {
                        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                    }
                })
            .then()
            .catch(error => console.log(error))
    }
}