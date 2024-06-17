import axios from "axios";

// const portaAPI = '5190';
const portaAPI = '5190';

// const ip = "192.168.21.118"

const ip = "192.168.21.85"
// Allan sala 172.16.39.107
// Allan casa 192.168.15.5

//172.16.39.100:4466

const apiUrlLocal = `http://${ip}:${portaAPI}/api`
// const apiUrlLocal = `http://192.168.21.92:4466/api`

const api = axios.create({
    baseURL: apiUrlLocal
})



// Endereço da API
// const apiUrlLocal = 'http://localhost:5190/api';

// // Criação da instância do Axios
// const api = axios.create({
//     baseURL: apiUrlLocal
// });

export default api;
