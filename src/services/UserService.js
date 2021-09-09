import axios from 'axios';
const url = 'http://localhost:3000/api/';
export default {

    getUserData(params) {
        return axios.get(url + 'user/' + params).then(response => response.data);
    },
    updateUserData(email, params) {
        return axios.post(url + 'user/' + email, params).then(response => response.data)
    }
};