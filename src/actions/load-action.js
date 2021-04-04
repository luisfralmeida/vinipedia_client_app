import axios from "axios";
import { vinipediaUrlForVintages } from "../api";
var qs = require('qs');

export default function loadActionAsync (offset, limit, reload=false) {

    return async (dispatch, getState) => {

        const state = getState();

        console.log("state.filters", state.filters);

        const getBodyParameters = {
            params: {
                offset: offset,
                limit: limit,
                search: state.filters.query, 
                type: state.filters.type,
                producer: state.filters.producer,
                origin: state.filters.region,
                grape : state.filters.grape,
                year: state.filters.year,
                average_score_min: state.filters.average_rating,
                alcohol_content_min: state.filters.alcohol_content,
                nr_reviews_min: state.filters.nr_reviews,
                // ordering: year, // -year
            }
        };

        // To serialize params keys that include more than one value 
        // (e.g. instead of having type=['red','white'] leading to an invalid request with ...&type[]=red&type[]=white, 
        // instead we get a valid request with ...&type=red&type=white)
        let customAxios = axios.create({
            paramsSerializer: params => qs.stringify(params, {arrayFormat: 'repeat'})
        })

        await customAxios.get(vinipediaUrlForVintages(), getBodyParameters)
        .then(data => dispatch(loadAction(data, reload)))
        .catch(error => console.log(error));
    }
}

const loadAction = (data, reload) => {
    switch (reload) {
        case true:
            console.log("RELOAD");
            return {
                type: 'RELOAD',
                payload: data.data
            }
        case false:
            console.log("LOAD_MORE");
            return {
                type: 'LOAD_MORE',
                payload: data.data
            }
        default:
            // error
    }
}