import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { reducer as AuthReducer } from "./AuthReducer/reducer";
import { reducer as UserReducer } from "./UsersReducer/reducer";
import { reducer as UserChats } from "./UserChats/reducer";

const rootReducer=combineReducers({AuthReducer,UserReducer,UserChats});

const store=legacy_createStore(rootReducer,applyMiddleware(thunk));

export {store};