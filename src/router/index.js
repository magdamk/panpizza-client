import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from "../views/SignUp.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import Verify from "../views/Verify.vue";
import Account from "../views/Account.vue";
import EditForm from "../views/EditForm.vue";
import AddMenuItem from "../views/AddMenuItem.vue";
import Orders from "../views/Orders.vue";
import Order from "../views/Order.vue";
import store from '../store';
import AuthService from '@/services/AuthService.js';

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/edit/:itemID',
        name: 'EditForm',
        component: EditForm,
        meta: { requiresAuth: true }
    },
    {
        path: '/add',
        name: 'AddMenuItem',
        component: AddMenuItem,
        meta: { requiresAuth: true }
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
        path: "/account",
        name: "account",
        component: Account,
        meta: { requiresAuth: true }
    },
    {
        path: "/logout",
        name: "logout",
        component: Logout,
        meta: { requiresAuth: true }
    },
    {
        path: "/verify/:userID/:token",
        name: "verify",
        component: Verify
    },
    {
        path: "/orders",
        name: "Orders",
        component: Orders,
        meta: { requiresAuth: true }
    },
    {
        path: "/orders/:orderID",
        name: "Order",
        component: Order,
        meta: { requiresAuth: true }
    },
    {
        path: "/:catchAll(.*)",
        name: "NotFound",
        component: () =>
            import ( /* webpackChunkName: "notfound" */ "../views/NotFound.vue"),
    }
]



const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        if (!store.getters.isLoggedIn) {
            next({ name: 'Home' })
        } else { next() }
    } else { next() }
})

export default router