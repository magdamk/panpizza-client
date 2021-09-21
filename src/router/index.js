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

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/edit/:itemID',
        name: 'EditForm',
        component: EditForm
    },
    {
        path: '/add',
        name: 'AddMenuItem',
        component: AddMenuItem
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
        component: Account
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
    },
    {
        path: "/orders/",
        name: "Orders",
        component: Orders
    },
    {
        path: "/orders/:orderID",
        name: "Order",
        component: Order
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})



export default router