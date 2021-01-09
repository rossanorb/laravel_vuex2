const state = {
    paginate: {
        current_page: 1,
        last_page: 1,
        per_page: 5,
        total: 0,
        from: 0,
        to: 0
    }
}

const getters = {
    paginate: (state) => {
        return state.paginate;
    },

    current_page: (state) => {
        return state.paginate.current_page;        
    }
}

const mutations = {
    refresh(state, paginate){        
        state.paginate = paginate;
    },

    changePage(state, current_page) {
        state.paginate.current_page = current_page;
    }

}

const actions = {

    changePage({ commit }, current_page) {
        let paginate = state.paginate;
        paginate.current_page = current_page;
        commit('refresh', paginate);
    }

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}