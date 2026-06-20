import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => {
    return {
      userData: "ignacio@bluuweb.com"  
    }
  }, getters: { // dont modify the state
    lowerCase(state) {
      return state.userData.toLowerCase()
    }
  }, actions: { // modify the state
    registerUser(name) {
      this.userData = name
    }
  }
})