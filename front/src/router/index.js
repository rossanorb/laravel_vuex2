import Vue from 'vue';
import VueRouter from 'vue-router';
import Imoveis from '../views/imoveis';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Imoveis',
        component: Imoveis
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
