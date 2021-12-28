export default {
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
                const json = response.json;
                commit('setLoggedIn', true);
                commit('setAuthToken', json.token);
                setCookie('auth-token', json.token);
                dispatch('authenticate');
            } else {
                commit('logout');
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
                    this.$app.config.globalProperties.$router.push('/users')
                } else {
                    commit('logout');
                }
            } else {
                commit('logout');
            }
        },
        async logout({ commit }) {
            if (getCookie('auth-token') || state.authToken) {
                this.$networking.auth_token = getCookie('auth-token') || state.authToken
                const response = await this.$networking.get('/auth/logout');
                if (response.success) {
                    commit('logout');
                } else {
                    commit('logout');
                }
            } else {
                state.loggedIn = false;
            }
        }

    },
    namespaced: true,
}