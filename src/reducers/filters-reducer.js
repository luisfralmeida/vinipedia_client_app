export const defaultFilterState = {
    query: null,
    type: [],
    producer: [],
    region: [], 
    grape: [],  
    alcohol_content: null, 
    year: null,
    nr_reviews: null, 
    average_rating: null, 
    // ordering: year, // -year
}

export default function filtersReducer (state=defaultFilterState, action) {
    console.log("action.type:", action.type);
    let index;
    switch (action.type) {
        case 'RESET':
            console.log("RESET");
            return {
                ...defaultFilterState,
            }
        case 'ADD_type':
            console.log("ADD_type:", action.payload);
            console.log({
                ...state,
                type: [
                    ...state.type,
                    action.payload.value
                ]
            })
            return {
                ...state,
                type: [
                    ...state.type,
                    action.payload.value
                ]
            }
        case 'REMOVE_type':
            console.log("REMOVE_type:", action.payload);
            let modified_type = [...state.type];
            index = modified_type.indexOf(action.payload.value);
            if (index > -1) {
                modified_type.splice(index, 1);
            }
            return {
                ...state,
                type: modified_type,
            }
        case 'ADD_producer':
            console.log("ADD_producer:", action.payload);
            console.log({
                ...state,
                producer: [
                    ...state.producer,
                    action.payload.value
                ]
            })
            return {
                ...state,
                producer: [
                    ...state.producer,
                    action.payload.value
                ]
            }
        case 'REMOVE_producer':
            console.log("REMOVE_producer:", action.payload);
            let modified_producer = [...state.producer];
            index = modified_producer.indexOf(action.payload.value);
            console.log("index:", index)
            if (index > -1) {
                modified_producer.splice(index, 1);
            }
            return {
                ...state,
                producer: modified_producer,
            }
        case 'ADD_region':
            console.log("ADD_region:", action.payload);
            console.log({
                ...state,
                region: [
                    ...state.region,
                    action.payload.value
                ]
            })
            return {
                ...state,
                region: [
                    ...state.region,
                    action.payload.value
                ]
            }
        case 'REMOVE_region':
            console.log("REMOVE_region:", action.payload);
            let modified_region = [...state.region];
            index = modified_region.indexOf(action.payload.value);
            console.log("index:", index)
            if (index > -1) {
                modified_region.splice(index, 1);
            }
            return {
                ...state,
                region: modified_region,
            }
        case 'ADD_grape':
            console.log("ADD_grape:", action.payload);
            console.log({
                ...state,
                grape: [
                    ...state.grape,
                    action.payload.value
                ]
            })
            return {
                ...state,
                grape: [
                    ...state.grape,
                    action.payload.value
                ]
            }
        case 'REMOVE_grape':
            console.log("REMOVE_grape:", action.payload);
            let modified_grape = [...state.grape];
            index = modified_grape.indexOf(action.payload.value);
            console.log("index:", index)
            if (index > -1) {
                modified_grape.splice(index, 1);
            }
            return {
                ...state,
                grape: modified_grape,
            }
        case 'ADD_year':
            console.log("ADD_year:", action.payload);
            return {
                ...state,
                year: action.payload.value
            }
        case 'REMOVE_year':
            console.log("REMOVE_year:", action.payload);
            return {
                ...state,
                year: null,
            }
        case 'ADD_average_rating':
            console.log("ADD_average_rating:", action.payload);
            return {
                ...state,
                average_rating: action.payload.value
            }
        case 'REMOVE_average_rating':
            console.log("REMOVE_average_rating:", action.payload);
            return {
                ...state,
                average_rating: null,
            }
        case 'ADD_alcohol_content':
            console.log("ADD_alcohol_content:", action.payload);
            return {
                ...state,
                alcohol_content: action.payload.value
            }
        case 'REMOVE_alcohol_content':
            console.log("REMOVE_alcohol_content:", action.payload);
            return {
                ...state,
                alcohol_content: null,
            }
        case 'ADD_nr_reviews':
            console.log("ADD_nr_reviews:", action.payload);
            return {
                ...state,
                nr_reviews: action.payload.value
            }
        case 'REMOVE_nr_reviews':
            console.log("REMOVE_nr_reviews:", action.payload);
            return {
                ...state,
                nr_reviews: null,
            }
        case 'ADD_query':
            console.log("ADD_query:", action.payload);
            return {
                ...state,
                query: action.payload.value
            }
        case 'REMOVE_query':
            console.log("REMOVE_query:", action.payload);
            return {
                ...state,
                query: null,
            }
        default: 
            console.log("default (filters-reducer)", action.payload);
            return state;
    }
}