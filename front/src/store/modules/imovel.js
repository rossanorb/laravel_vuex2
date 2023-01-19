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
        state.imoveis = response;
    },
    
    setAction(state, action){
        state.action = action;
    },
};

const actions = {
    updatePage({dispatch}){
        dispatch('paginate/changePage', 1, { root: true });
    },

    create({ commit, dispatch }, form) {
        api.create(form)
            .then(response => {
                commit('setAction', 'create');
                commit('setImovel', response);
                dispatch('updatePage');
            });
    },
    
    list({ commit, rootState  }, queryString) {
        
        let page = rootState.paginate.paginate.current_page;
        let limit = rootState.paginate.paginate.per_page;

        queryString = `?page=${page}&limit=${limit}&${queryString}`;
        api.list(queryString)
            .then(response => {
                if (response.status) {
                    commit('setAction', 'list');
                    commit('setImoveis', response);
                    commit('paginate/refresh', response.paginate,  { root: true });
                }
            });
    },

    propriedades({ commit }, queryString) {
        queryString = `?${queryString}`;
        api.list(queryString)
            .then(response => {
                if (response.status) {
                    commit('setAction', 'list');
                    commit('setImoveis', response);                    
                }
            });
    },

    remove({ commit, dispatch }, id) {
        api.delete(id)
            .then(response => {
                commit('setAction', 'delete');
                commit('setImovel', response);
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