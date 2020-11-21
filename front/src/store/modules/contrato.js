import api from './../../api/apicontrato';

const state = {
    contrato: {},
    action: 'list'
};

const getters = {
    contrato: (state) => {
        return state.contrato;
    },

    action: (state) => {
        return state.action;
    }    
}

const mutations = {
    seContrato(state, response){
        state.contrato = response;
    },

    setAction(state, action){
        state.action = action;
    },
    
    log(state, param){
        console.log(param);
    }     
};

const actions = {
    create({ commit }, form) {
        api.create(form)
            .then(response => {
                commit('setAction', 'create');                
                commit('seContrato', response);
            });
    },


};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};