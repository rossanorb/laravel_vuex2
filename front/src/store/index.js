import Vue from 'vue';
import Vuex from 'vuex';
import imovel from './modules/imovel';
import contrato from './modules/contrato';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
      imovel,
      contrato
    }
});
