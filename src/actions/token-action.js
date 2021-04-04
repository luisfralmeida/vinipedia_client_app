import axios from "axios";
import { vinipediaAuthTokenUrl } from "../api";

export default function tokenActionAsync () {

    const bodyParameters = {
        username: "admin",
        password: "admin"
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