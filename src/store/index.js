import { createStore } from 'vuex'
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

const getDefaultState = () => {
    return {
        token: '',
        email: {},
        role: 'user',
        cartItems: []
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
        cartTotal: state => {
            return state.cartItems.reduce((acc, cartItem) => {
                return (cartItem.quantity * cartItem.price) + acc;
            }, 0).toFixed(2);
        },
        cartQuantity: state => {
            return state.cartItems.reduce((acc, cartItem) => {
                return cartItem.quantity + acc;
            }, 0);
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
        REMOVE_FROM_CART(state, item) {
            const ind = state.cartItems.indexOf(item);
            state.cartItems.splice(ind, 1);
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
        addToCart: ({ commit, dispatch }, item) => {
            commit('ADD_TO_CART', item);
        },
        removeFromCart: ({ commit }, item) => {
            commit('REMOVE_FROM_CART', item);
        }
    }
})