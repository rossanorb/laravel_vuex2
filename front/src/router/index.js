import Vue from 'vue';
import VueRouter from 'vue-router';
import Imoveis from '../views/imoveis/';
import CadastroImoveis from '../views/imoveis/cadastro';
import NovoContrato from '../views/contratos/cadastro';

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
    },
    {
        path:'/contratos/novo',
        name: 'NovoContrato',
        component: NovoContrato
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
