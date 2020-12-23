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
    setContrato(state, response){
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
    updatePage({dispatch}){
        dispatch('paginate/changePage', 1, { root: true });
    },

    create({ commit, dispatch }, form) {
        api.create(form)
            .then(response => {
                commit('setAction', 'create');                
                commit('setContrato', response);
                dispatch('updatePage');
            });
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};