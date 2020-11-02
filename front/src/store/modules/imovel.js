import api from '../../api/apimovel';

const state = {    
    response: {},
    action: 'list'
};

const getters = {
    response: (state) => {
        return state.response;
    },

    action: (state) => {
        return state.action;
    }
};

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
    list({ commit }, queryString) {
        api.list(queryString)
            .then(response => {
                if (response.status) {  
                    commit('setAction', 'list');
                    commit('setResponse', response);
                }
            });
    },
    filter({ commit }, queryString) {
        console.log(queryString);
        api.list(queryString)
            .then(response => {
                if (response.status) {
                    commit('setAction', 'list');
                    commit('setResponse', response);
                }
            });
    },    
    remove({ commit }, id) {
        api.delete(id)
            .then(response => {
                commit('setAction', 'delete');
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