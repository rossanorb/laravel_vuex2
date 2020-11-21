import api from '../../api/apimovel';

const state = {
    imovel: {},
    imoveis: {},
    action: 'list'
};

const getters = {
    imovel: (state) => {
        return state.imovel;
    },

    imoveis: (state) => {
        return state.imoveis;
    },

    action: (state) => {
        return state.action;
    }
};

const mutations = {
    setImovel(state, response){
        state.imovel = response;
    },

    setImoveis: (state, response) => {
        return state.imoveis = response;
    },    

    setAction(state, action){
        state.action = action;
    },
};

const actions = {
    create({ commit }, form) {
        api.create(form)
            .then(response => {
                commit('setAction', 'create');
                commit('setImovel', response);
            });
    },
    list({ commit }, queryString) {
        api.list(queryString)
            .then(response => {
                if (response.status) {  
                    commit('setAction', 'list');
                    commit('setImoveis', response);
                }
            });
    },
    filter({ commit }, queryString) {
        console.log(queryString);
        api.list(queryString)
            .then(response => {
                if (response.status) {
                    commit('setAction', 'list');
                    commit('setImoveis', response);
                }
            });
    },    
    remove({ commit }, id) {
        api.delete(id)
            .then(response => {
                commit('setAction', 'delete');
                commit('setImovel', response);
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