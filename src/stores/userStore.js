import {defineStore} from "pinia";
import axiosInstance from "src/utils/axiosInstance.js";

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    currentUser: null,
    loggedUser: null,
    rolesOfLoggedUser: null,
    rolesOfCurrentUser: null,
  }), getters: {}, actions: {
    async createUser(user) {
      console.log(user)
      try {
        const res = axiosInstance.post('/user/register', user, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
          }
        })
        if (!((await res).statusText === 'OK')) {
          console.log('Unable to register user.');
        } else {
          // const data = await  res.data
          await this.getUsers()
        }

      } catch (error) {
        console.log(error)
      }
    },
    async getUsers() {
      try {
        const res = await axiosInstance.get('user/index', {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
          },
        })
        if (!(res.statusText === 'OK')) {
          console.log('Unable to get users')
        } else {
          this.users = await res.data.user
        }
      } catch (error) {
        console.log(error)
      }
    },
    async deleteUser(userId) {
      try {
        const res = await axiosInstance.delete('/user/delete/' + userId, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
          },
        })
        if (!(res.statusText === 'OK')) {
          console.log('Unable to delete user.')
        } else {
          const data = await res.data
          console.log(data.message)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async editUserRole(role) {
      try {
        const res = await axiosInstance.patch('user/role/edit/' + this.currentUser.id, role, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
          },
        })
        if (!(res.statusText === 'OK')) {
          console.log('Unable to edit user\'s role.')
        } else {
          const data = await res.data
          console.log(data)
          await this.getUsers()
        }
      } catch (error) {
        console.log(error)
      }
    },async getLoggedUserRoles() {
      try {
        const res = await axiosInstance.get('/user/role/get/' + this.loggedUser.id, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
          },
        })
        if (!(res.statusText === 'OK')) {
          console.log('Unable to get roles.')
        } else {
          const data = await res
          this.rolesOfLoggedUser = data.data.roles
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getUserRoles() {
      try {
        const res = await axiosInstance.get('/user/role/get/' + this.currentUser.id, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
          },
        })
        if (!(res.statusText === 'OK')) {
          console.log('Unable to get roles.')
        } else {
          const data = await res
          this.rolesOfCurrentUser = data.data.roles
        }
      } catch (error) {
        console.log(error)
      }
    },
    async changePassword(data){
      console.log(data)
      try{
        const res = await axiosInstance.patch('/user/changepassword/'+this.loggedUser.id,data,{
          headers:{
            Accept: 'application/json',
            'Content-type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
          }
        })
        if (!(res.statusText === 'OK')) {
          console.log('Unable to change password')
        } else {
          const data = await  res.data
          console.log(data.message)
          localStorage.removeItem('userToken')
          this.isLoggedIn = false
          useUserStore().loggedUser = null
          this.router.push('/login')
          console.log('Password changed successfully.')
        }
      }catch (error){
        console.log(error.message)
      }
    },
    async getCurrentUser() {
      try {
        const res = await axiosInstance.get('/user/get/current', {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
          },
        })
        if (!(res.statusText === 'OK')) {
          console.log('Unable to get current user')
        } else {
          this.loggedUser = await res.data
          console.log(this.loggedUser)
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
})
