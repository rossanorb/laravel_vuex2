import axios from 'axios';
// initial state
const state = {
    loading: false
}

//getters
const getters = {
    loading: (state) => {
        return state.loading        
    }
}

// mutations
const mutations = {
    setLoading(state, status){
        state.loading = status;
    }
}

// actions
const actions = {

    enableInterceptor({ commit }){            

            axios.interceptors.request.use((config) => {                
                commit('setLoading', true);
                return config;
            }, (error) => {
                commit('setLoading', false);
                return Promise.reject(error);
            })

            axios.interceptors.response.use((response) => {
                commit('setLoading', false)
                return response;
            }, function(error) {
                commit('setLoading', false)
                return Promise.reject(error)
            })
    },

    start({ commit }){
        commit('setLoading', true);
        setTimeout(function(){
            commit('setLoading', false);
        }, 1000);        
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
