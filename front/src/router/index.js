import Vue from 'vue';
import VueRouter from 'vue-router';
import Imoveis from '../views/imoveis/';
import CadastroImoveis from '../views/imoveis/cadastro'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Imoveis',
        component: Imoveis
    },
    {
        path:'/imoveis/cadastro',
        name: 'CadastroImoveis',
        component: CadastroImoveis
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
