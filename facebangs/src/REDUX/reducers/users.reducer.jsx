import { GET_USERS } from "../actions/users.actions";

const initialState = {}


export default function usersReducer(state = initialState, action) {

    if (action.type === GET_USERS) {
        return action.payload
    }


    return state;
}