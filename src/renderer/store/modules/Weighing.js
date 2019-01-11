const state = {
  weight: {},
}

const mutations = {
  SET_WEIGHT(state, weight) {
    state.weight = weight
  },
}

const actions = {
  setweight({ commit }, weight) {
    commit('SET_WEIGHT', weight)
  },
}

export default {
  state,
  mutations,
  actions,
}
