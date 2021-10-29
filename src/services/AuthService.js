import axios from 'axios';
const url = 'http://localhost:3000/api/';
export default {
    login(credentials) {
        return axios
            .post(url + 'login/', credentials)
            .then(response => response.data)
    },
    signUp(credentials) {
        return axios
            .post(url + 'sign-up/', credentials)
            .then(response => response.data);
    },
    verify(credentials) {
        return axios.get(url + 'verify/' + credentials).then(response => response.data);
    },
    logout() {
        return axios.delete(url + 'logout/').then(response => response.data);
    }
};