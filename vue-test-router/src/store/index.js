import { createStore } from 'vuex'

export default createStore({
  state: {
    count: 0,
    users: []
  },
  mutations: {
    increment(state) {
      state.count++
    },
    decrement(state) {
      state.count--
    },
    addUser(state, user) {
      state.users.push(user);
    },
    clearUser(state) {
      state.users = [];
    }
  },
  actions: {
    increment: ({ commit }) => commit('increment'),
    decrement: ({ commit }) => commit('decrement'),
    loadUser: async ({ commit }, gender = '') => {
      // const response = await fetch('https://random-data-api.com/api/users/random_user');
      const response = await fetch('https://randomuser.me/api/?gender=' + gender);
      const json = await response.json();
      commit('addUser', json.results[0]);
      // return new Promise(async (resolve, reject) => {

      //   resolve();
      // });
    },
  },
  modules: {
  }
})