import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from "../views/SignUp.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import Verify from "../views/Verify.vue";

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: "/sign-up",
        name: "sign-up",
        component: SignUp
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/logout",
        name: "logout",
        component: Logout
    },
    {
        path: "/verify/:userID/:token",
        name: "verify",
        component: Verify
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router