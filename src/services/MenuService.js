import axios from 'axios';
const url = 'http://localhost:3000/api/';
export default {

    getAllItems() {
        const menu = axios.get(url + 'home').then(response => response.data);
        console.log('menu-service', menu)
        return menu
    }
};