export const state = () => ({
  auth: false,
  sidebar: false
})

export const mutations = {
  LOGIN(state) {
    state.auth = true;
  },
  LOGOUT(state) {
    state.auth = false;
  },
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  }
}
