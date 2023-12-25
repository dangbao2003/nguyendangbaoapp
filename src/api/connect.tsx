import axios from "axios";

export default axios.create({
    baseURL: '',
    headers:{
        Authorization: 'Bearer API_KEY'
    }
});