import { combineReducers } from "redux";
import loadReducer from "./load-reducer";
import tokenReducer from "./token-reducer";
import filtersReducer from "./filters-reducer";

const rootReducer = combineReducers({
    results: loadReducer,
    token: tokenReducer,
    filters: filtersReducer,
});

export default rootReducer;