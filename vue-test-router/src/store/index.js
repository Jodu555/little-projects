import { createStore } from 'vuex'

const counterModule = {
  state: () => ({ count: 0, }),
  mutations: {
    increment(state) {
      state.count++
    },
    decrement(state) {
      state.count--
    },
  },
  actions: {
    increment: ({ commit }) => commit('increment'),
    decrement: ({ commit }) => commit('decrement'),
  },
  namespaced: true,
}

const authenticationModule = {
  state: {
    loggedIn: false,
    userInfo: {
      UUID: '',
      username: '',
      email: '',
    }
  },
  mutations: {
    setUser(state, user) {
      state.userInfo = user;
    },
    setLoggedIn(state, loggedIn) {
      state.loggedIn = loggedIn;
    }
  },
  actions: {
    login: async ({ commit }, { username, password }) => {
      const response = await fetch('http://localhost:3100/auth/login', {
        method: 'POST',
        headers: {
          'application-type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
      });
      const json = await response.json();
    },
    authenticate: async ({ state, commit }) => {
      if (getCookie('auth-token')) {
        const response = await fetch('https://localhost:3100/auth/login' + gender);
        const json = await response.json();
      } else {
        state.loggedIn = false;
      }
    },
  },
}

export default createStore({
  state: {
    users: []
  },
  mutations: {

    addUser(state, user) {
      state.users.push(user);
    },
    clearUser(state) {
      state.users = [];
    },
    removeUser(state, uuid) {
      state.users = state.users.filter(e => e.login.uuid !== uuid);
    }
  },
  actions: {

    loadUser: async ({ commit }, gender = '') => {
      // const response = await fetch('https://random-data-api.com/api/users/random_user');
      const response = await fetch('https://randomuser.me/api/?gender=' + gender);
      const json = await response.json();
      commit('addUser', json.results[0]);
    },
  },
  modules: {
    counter: counterModule,
  }
})


