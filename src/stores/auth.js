import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null, // the user object
    token: null, // the JWT token
  }),
  getters: {
    isAuthenticated: (state) => !!state.user && !!state.token, // check if the user and token are not null
    getUser: (state) => state.user, // return the user object
    getToken: (state) => state.token, // return the token
  },
  actions: {
    login(token, user){
      this.user = user
      this.token = token
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    },
    logout(token, user){
      this.user = null
      this.token = null
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    isLoggedIn() {
      // get the user and token from the localstorage
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      // if the user and token are not null, set them to the state
      if (user && token) {
        this.user = user;
        this.token = token;
      }

      // check if the user and token are not null in the state
      return !!this.user && !!this.token;
    }
  }
})
