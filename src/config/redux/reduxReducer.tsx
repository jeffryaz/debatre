import { combineReducers } from "redux";
import LoadReducers from "./reducer";

const reduxReducer = combineReducers(LoadReducers);

const rootReducer = (state: any, action: any) => reduxReducer(state, action);

export default rootReducer;
