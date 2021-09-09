import { createStore } from 'vuex'
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

const getDefaultState = () => {
    return {
        token: '',
        email: {}
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
        }
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_USER: (state, email) => {
            state.email = email;
        },
        RESET: state => {
            Object.assign(state, getDefaultState());
        }
    },
    actions: {
        login: ({ commit, dispatch }, { token, email }) => {
            commit('SET_TOKEN', token);
            commit('SET_USER', email);
            // set auth header
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        },
        logout: ({ commit }) => {
            commit('RESET', '');
        }
    }
})