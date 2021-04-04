const initialState = {
    token: null
}

export default function tokenReducer (state=initialState, action) {
    switch (action.type) {
        case 'GET' :
            console.log("state:", state);
            console.log("(token) action.payload:", action.payload);
            return {
                token: action.payload.token
            }
        default: 
            return state;
    }
}