import axios from "axios";

const portaAPI = '5190';

const ip = "192.168.21.85";

//172.16.39.100:4466

const apiUrlLocal = `http://${ip}:${portaAPI}/api`

const api = axios.create({
    baseURL: apiUrlLocal
})

export default api;