import {acceptHMRUpdate, defineStore} from 'pinia'
import axiosInstance from 'src/utils/axiosInstance.js'
import {useUserStore} from "stores/userStore.js";

export const useAuthStore = defineStore('auths', {
  state: () => ({
    loginToken: null,
    isLoggedIn: false,

  }),
  getters: {},
  actions: {
    async handleLogin(credentials) {
      try {
        const res = await axiosInstance.post('/login', credentials, {
        })
        if (!(res.statusText === 'OK')) {
          console.log('Unable to login.')
        } else {
          console.log("Logging user ")
          const data = await res.data
          localStorage.setItem('userToken', data.token)
          // this.loginToken = localStorage.getItem('userToken')
          this.isLoggedIn = true
          const userStore = useUserStore()
          await userStore.getCurrentUser()
          this.router.push('/dashboard')
        }
      } catch (error) {
        console.log(error)
      }
    },
    async handleLogout() {
      try {
        const res = await axiosInstance.post(
          '/logout',
          {},
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('userToken'),
            },
          },
        )
        if (!(res.statusText === 'OK')) {
          console.log('unable to logout')
        } else {
          localStorage.removeItem('userToken')
          this.isLoggedIn = false
          useUserStore().loggedUser = null
          this.router.push('/login')
        }
      } catch (error) {
        console.log(error)
      }
    },

    async checkAuth() {
      try {
        this.isLoggedIn = !!localStorage.getItem('userToken')
      } catch (error) {
        console.log(error)
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
