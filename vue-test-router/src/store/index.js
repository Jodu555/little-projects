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
    },
    logout(state) {
      state.loggedIn = false;
      state.authToken = '';
      state.userInfo = {
        UUID: '',
        username: '',
        email: ''
      };
    }
  },
  actions: {
    async login({ commit, state, dispatch }, credentials) {
      const response = await this.$networking.post('/auth/login', JSON.stringify(credentials));
      if (response.success) {
        commit('setLoggedIn', true);
        commit('setAuthToken', json.token);
        setCookie('auth-token', json.token);
        dispatch('authenticate');
      } else {
        commit('setLoggedIn', false);
        commit('setAuthToken', '');
      }
    },

    async authenticate({ state, commit }) {
      if (getCookie('auth-token') || state.authToken) {
        this.$networking.auth_token = getCookie('auth-token') || state.authToken
        const response = await this.$networking.get('/auth/info');
        if (response.success) {
          const json = response.json;
          commit('setUser', {
            UUID: json.UUID,
            username: json.username,
            email: json.email,
          });
        } else {
          commit('setLoggedIn', false);
          commit('setAuthToken', '');
        }
      } else {
        state.loggedIn = false;
      }
    },
    async logout({ commit }) {
      if (getCookie('auth-token') || state.authToken) {
        this.$networking.auth_token = getCookie('auth-token') || state.authToken
        const response = await this.$networking.get('/auth/logout');
        if (response.success) {
          commit('logout');
        } else {
          commit('setLoggedIn', false);
          commit('setAuthToken', '');
        }
      } else {
        state.loggedIn = false;
      }
    }

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


