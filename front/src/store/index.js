import Vue from 'vue';
import Vuex from 'vuex';
import imovel from './modules/imovel';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
      imovel
    }
});
