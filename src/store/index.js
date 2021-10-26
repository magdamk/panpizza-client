import { createStore } from 'vuex'
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

const getDefaultState = () => {
    return {
        token: '',
        email: {},
        role: 'user',
        id: '',
        cartItems: [],
        total: 0
    };
};

export default createStore({
    strict: true,
    plugins: [createPersistedState()],
    state: getDefaultState(),

    getters: {
        isLoggedIn: state => {
            return state.token;
        },
        getUser: state => {
            return state.email;
        },
        getRole: state => {
            return state.role;
        },
        getId: state => {
            return state.id;
        },
        getCartItems: state => {
            return state.cartItems
        },
        cartQuantity: state => {
            return state.cartItems.length;
        },
        getTotal: state => {
            return state.total;
        }
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_USER: (state, email) => {
            state.email = email;
        },
        SET_ROLE: (state, role) => {
            state.role = role;
        },
        SET_ID: (state, id) => {
            state.id = id;
        },
        ADD_TO_CART(state, item) {
            // console.log('store ad to cart echo', item);
            state.cartItems.push(item);
        },
        REFRESH_TOTAL(state, price) {
            state.total = state.total + price;
        },
        REMOVE_FROM_CART(state, item) {
            const ind = state.cartItems.findIndex(i => i._id === item._id);
            state.cartItems.splice(ind, 1);
        },
        RESET_CART(state) {
            state.cartItems = [];
            state.total = 0;
        },
        RESET: state => {
            Object.assign(state, getDefaultState());
        }
    },
    actions: {
        login: ({ commit, dispatch }, { token, email, role, id }) => {
            commit('SET_TOKEN', token);
            commit('SET_USER', email);
            commit('SET_ROLE', role);
            commit('SET_ID', id);
            // set auth header
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        },
        logout: ({ commit }) => {
            commit('RESET', '');
        },
        addToCart: ({ commit, dispatch }, item) => {
            commit('ADD_TO_CART', item);
            commit('REFRESH_TOTAL', item.price);
        },
        removeFromCart: ({ commit, dispatch }, item) => {
            commit('REMOVE_FROM_CART', item);
            commit('REFRESH_TOTAL', item.price * (-1));
        },
        removeAllCartItems: ({ commit }) => {
            commit('RESET_CART');
        }
    }
})