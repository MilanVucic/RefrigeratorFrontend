import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/Login.vue';
import FridgeList from '../pages/FridgeList.vue';
import FridgeDetails from '../pages/FridgeDetails.vue';
import FridgeForm from '../pages/FridgeForm.vue';
import Register from '../pages/Register.vue';
import { useAuthStore } from '../stores/auth';

const routes = [
    {
        path: '/',
        // redirect dynamically based on whether we're logged in or not
        redirect: () => {
            const auth = useAuthStore();
            return auth.accessToken ? '/fridges' : '/login';
        },
    },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/fridges', component: FridgeList },
    { path: '/fridges/:id', component: FridgeDetails, props: true },
    { path: '/fridges/new', component: FridgeForm },
    { path: '/fridges/:id/edit', component: FridgeForm, props: true },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, _from, next) => {
    const auth = useAuthStore();
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);

    if (authRequired && !auth.accessToken) {
        return next('/login');
    }
    next();
});

export default router;
