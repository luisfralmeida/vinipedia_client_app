const initialState = {
    results: [],
    count: null,
    next: null
}

export default function loadReducer (state=initialState, action) {
    switch (action.type) {
        case 'LOAD_MORE' :
            return {
                ...state,
                results: [
                    ...state.results, 
                    ...action.payload.results
                ],
                count: action.payload.count, 
                next: action.payload.next
            };
        case 'RELOAD' :
            return {
                ...state,
                results: [
                    ...action.payload.results
                ],
                count: action.payload.count, 
                next: action.payload.next
            };
        default: 
            return state;
    }
}