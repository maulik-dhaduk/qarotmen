import axios from "axios";

const Api = axios.create({
    baseURL:"https://qarotmen.onrender.com"
})

export default Api