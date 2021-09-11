import axios from 'axios';
const url = 'http://localhost:3000/api/';
export default {

    getAllItems() {
        return axios.get(url + 'home').then(response => response.data);
    },
    getItemByID(id) {
        return axios.get(url + 'home/' + id).then(response => response.data);
    },
    updateItem(itemID, params) {
        return axios.patch(url + 'home/' + itemID, params).then(response => response.data);
    },
    addMenuItem(params) {
        return axios.post(url + 'home/add', params).then(response => response.data);
    }
};