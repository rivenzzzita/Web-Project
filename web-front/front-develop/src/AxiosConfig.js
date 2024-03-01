import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:6060/api/users',


});

export default instance;