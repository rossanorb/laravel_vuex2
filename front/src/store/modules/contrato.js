import api from './../../api/apicontrato';

const state = {
    response: {},
    action: 'list'
};

const getters = {}

const mutations = {
    setResponse(state, response){
        state.response = response;
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
                commit('setResponse', response);
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