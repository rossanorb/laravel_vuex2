import api from '../../api/apiImovel';

const state = {    
    response: {}
};

const getters = {};

const mutations = {
    log(state, response) {
        console.log(response);
    }    
};

const actions = {
    create({ commit }, form) {
        api.create(form)
            .then(response => {
                commit('log', response);
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