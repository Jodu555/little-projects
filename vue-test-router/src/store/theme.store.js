export default {
    state: {
        dark: false,
    },
    mutations: {
        setDark(state, dark) {
            state.dark = dark ? dark : !state.dark;
            document.body.setAttribute('data-theme', state.dark ? 'dark' : 'light');
        },
    },
    actions: {
        async loadTheme({ commit, state, dispatch }) {
            //TODO: Logic for initial loading the theme state
        },
    },
    namespaced: true,
}