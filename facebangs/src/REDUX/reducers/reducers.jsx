import { combineReducers } from "redux";
import postsReducer from "./posts.reducer";
import userReducer from "./user.reducer";
import usersReducer from "./users.reducer";


export default combineReducers({

    userReducer,
    postsReducer,
    usersReducer,


});

