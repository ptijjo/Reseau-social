import { GET_POSTS } from "../actions/posts.actions";

const initialState = {};

export default function postsReducer(state = initialState, action) {

    if (action.type === GET_POSTS) {
        return action.payload;
    }

    return state;
}