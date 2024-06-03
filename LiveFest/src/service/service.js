import axios from "axios";

const portaAPI = '4466';

const ip = "192.168.21.92"

// Allan sala 192.168.21.92
// Allan casa 192.168.15.5

//172.16.39.100:4466

const apiUrlLocal = `http://${ip}:${portaAPI}/api`

const api = axios.create({
    baseURL: apiUrlLocal
})

export default api;