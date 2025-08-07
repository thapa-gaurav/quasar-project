import { defineStore, acceptHMRUpdate } from 'pinia'

export const useAuthStore = defineStore('auths', {
  state: () => ({}),
  getters: {},
  actions: {
    async handleLogin(credentials) {
      try {
        const res = await fetch('http://localhost:8000/api/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
          },
          body: JSON.stringify(credentials),
        })

        if (!res.ok) {
          console.log('Unable to login.')
        } else {
          const data = await res.json()
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
        const res = await fetch('http://localhost:8000/api/logout', {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
          },
        })

        if (!res.ok) {
          console.log('unble to logout')
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
        if (localStorage.getItem('userToken')) {
          return true
        }
        return false
      } catch (error) {
        console.log(error)
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
