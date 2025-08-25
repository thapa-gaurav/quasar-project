import { acceptHMRUpdate, defineStore } from 'pinia'
import axiosInstance from 'src/utils/axiosInstance.js'

export const useAuthStore = defineStore('auths', {
  state: () => ({
    loginToken: null
  }),
  getters: {},
  actions: {
    async handleLogin(credentials) {
      try {
        const res = await axiosInstance.post('/login', credentials, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        if (!(res.statusText === 'OK')) {
          console.log('Unable to login.')
        } else {
          const data = await res.data
          localStorage.setItem('userToken', data.token)
          this.loginToken = localStorage.getItem('userToken')
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
              Accept: 'application/json',
              'Content-type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('userToken'),
            },
          },
        )
        if (!(res.statusText === 'OK')) {
          console.log('unable to logout')
        } else {
          localStorage.removeItem('userToken')
          this.router.push('/login')
        }
      } catch (error) {
        console.log(error)
      }
    },
    async checkAuth() {
      try {
        return !!localStorage.getItem('userToken')
      } catch (error) {
        console.log(error)
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
