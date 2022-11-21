import { GET_USER, UPDATE_AVATAR } from "../actions/user.actions";

const initialState = {};


export default function userReducer(state = initialState, action) {

    if (action.type === GET_USER) {
        return action.payload
    }

    if (action.type === UPDATE_AVATAR) {
        return {
            ...state,
            avatar: action.payload,
        };
    }

    return state;
}