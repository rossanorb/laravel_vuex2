import api from '../../api/apiImovel';

const state = {    
    response: {}
};

const getters = {
    response: (state) => {
        return state.response;
    }
};

const mutations = {
    setResponse(state, response){
        state.response = response;
    }
};

const actions = {
    create({ commit }, form) {
        api.create(form)
            .then(response => {
                commit('setResponse', response);
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