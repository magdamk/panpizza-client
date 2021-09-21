import axios from 'axios';
const url = 'http://localhost:3000/api/';
export default {

    getUserOrders(id) {
        return axios.get(url + 'order/' + id).then(response => response.data);
    },
    addOrder(id, params) {
        return axios.post(url + 'order/' + id, params).then(response => response.data);
    },
    getOrder(id) {
        return axios.get(url + 'orders/' + id).then(response => response.data);
    },
    getAllOrders(query) {
        return axios.get(url + 'order/' + query).then(response => response.data);
    },
    changeOrderStatus(id, params) {
        return axios.patch(url + 'order/status/' + id, params);
    }
};