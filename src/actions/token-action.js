import axios from "axios";
import { vinipediaAuthTokenUrl } from "../api";

export default function tokenActionAsync () {

    const bodyParameters = {
        // replace with the appropriate credentials for any vinipedia registered user
        // (for testing only - these were meant to be input by the user through a login form)
        username: "<username>", 
        password: "<password>"
    };

    return async (dispatch) => {
        await axios.post(vinipediaAuthTokenUrl(), bodyParameters)
        .then(data => dispatch(tokenAction(data)))
        .catch(error => console.log(error));
    }
}

const tokenAction = (data) => {
    return {
        type: 'GET',
        payload: {
            token: data.data.token
        }
    }
}