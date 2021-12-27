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
    authToken: '',
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
    },
    setAuthToken(state, authToken) {
      state.authToken = authToken;
    }
  },
  actions: {
    login: async ({ commit, state, dispatch }, credentials) => {

      const response = await fetch('http://localhost:3100/auth/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      const json = await response.json();
      commit('setLoggedIn', true);
      commit('setAuthToken', json.token);
      setCookie('auth-token', json.token);
      dispatch('authenticate');
    },
    async authenticate({ state, commit }) {
      const networking = this.$app.config.globalProperties.$networking;
      console.log(networking);
      if (getCookie('auth-token') || state.authToken) {
        networking.auth_token = getCookie('auth-token') || state.authToken
        console.log(networking);
        const json = await networking.get('/auth/info');
        commit('setUser', {
          UUID: json.UUID,
          username: json.username,
          email: json.email,
        });
      } else {
        state.loggedIn = false;
      }
    },
  },
  namespaced: true,
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
    auth: authenticationModule,
  }
})


