import { createStore } from 'vuex'
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

const getDefaultState = () => {
    return {
        token: '',
        email: {},
        role: 'user',
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
            return state.role
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
        ADD_TO_CART(state, item) {
            // console.log('store ad to cart echo', item);
            state.cartItems.push(item);
        },
        REFRESH_TOTAL(state, price) {
            state.total = state.total + price;
        },
        REMOVE_FROM_CART(state, item) {
            const ind = state.cartItems.indexOf(item);
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
        login: ({ commit, dispatch }, { token, email, role }) => {
            commit('SET_TOKEN', token);
            commit('SET_USER', email);
            commit('SET_ROLE', role);
            // set auth header
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        },
        logout: ({ commit }) => {
            commit('RESET', '');
        },
        addToCart: ({ commit, dispatch }, { id, price }) => {
            commit('ADD_TO_CART', id);
            commit('REFRESH_TOTAL', price);
        },
        removeFromCart: ({ commit, dispatch }, { id, price }) => {
            commit('REMOVE_FROM_CART', id);
            commit('REFRESH_TOTAL', (-1) * price);
        },
        removeAllCartItems: ({ commit }) => {
            commit('RESET_CART');
        }
    }
})