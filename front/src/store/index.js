import Vue from 'vue';
import Vuex from 'vuex';
import imovel from './modules/imovel';
import contrato from './modules/contrato';
import loading from './modules/loading'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
      loading,
      imovel,
      contrato
    }
});
