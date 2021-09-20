import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import authReducer from "./reducers/authReducer";
import {APIconfigReducer} from "./reducers/APIconfigReducer";
import {mainPageReducer} from "./reducers/mainPageReducer";
import {moviePageReducer} from "./reducers/moviePageReducer";
import {personPageReducer} from "./reducers/personPageReducer";

const mainReducer = combineReducers({
    authorization:authReducer,
    config:APIconfigReducer,
    mainPage:mainPageReducer,
    moviePage:moviePageReducer,
    personPage:personPageReducer
});

const store = createStore(mainReducer,applyMiddleware(thunk));

export default store;

export type RootState = ReturnType<typeof mainReducer>;

// @ts-ignore
window.store=store;

