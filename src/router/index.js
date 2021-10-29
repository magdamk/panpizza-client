import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue';
import store from '../store';

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/edit/:itemID',
        name: 'EditForm',
        component: () =>
            import ( /* webpackChunkName: "editform" */ '../views/EditForm.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/add',
        name: 'AddMenuItem',
        component: () =>
            import ( /* webpackChunkName: "addmenuitem" */ '../views/AddMenuItem.vue'),
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
        name: "Sign-up",
        component: () =>
            import ( /* webpackChunkName: "signup" */ '../views/SignUp.vue')
    },
    {
        path: "/login",
        name: "Login",
        component: () =>
            import ( /* webpackChunkName: "login" */ '../views/Login.vue')
    },
    {
        path: "/account",
        name: "Account",
        component: () =>
            import ( /* webpackChunkName: "account" */ '../views/Account.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: "/cart",
        name: "Cart",
        component: () =>
            import ( /* webpackChunkName: "cart" */ '../views/Cart.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: "/logout",
        name: "Logout",
        component: () =>
            import ( /* webpackChunkName: "logout" */ '../views/Logout.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: "/verify/:userID/:token",
        name: "Verify",
        component: () =>
            import ( /* webpackChunkName: "verify" */ '../views/Verify.vue')
    },
    {
        path: "/orders",
        name: "Orders",
        component: () =>
            import ( /* webpackChunkName: "orders" */ '../views/Orders.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: "/orders/:orderID",
        name: "Order",
        component: () =>
            import ( /* webpackChunkName: "order" */ '../views/Order.vue'),
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