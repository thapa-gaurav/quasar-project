import {defineStore} from "pinia";
import axiosInstance from "src/utils/axiosInstance.js";

export const useRoleStore = defineStore('role', {
  state: () => ({
    roles: [], currentRole: null, permissionOfCurrentRoles: null,
  }), getters: {}, actions: {
    async createRoles(role) {
      console.log(role)
      try {
        const res = axiosInstance.post('/role/create', role, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
          }
        })
        if (!((await res).statusText === 'OK')) {
          console.log('Unable to create role.');
        } else {
          // const data = await  res.data
          await this.getRoles()
        }

      } catch (error) {
        console.log(error)
      }
    }, async getRoles() {
      try {
        const res = await axiosInstance.get('role/index', {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
          },
        })
        if (!((await res).statusText === 'OK')) {
          console.log('Unable to get roles')
        } else {
          this.roles = await res.data
        }
      } catch (error) {
        console.log(error)
      }
    }, async deleteRole(roleId) {
      try {
        const res = await axiosInstance.delete('/role/delete/' + roleId, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
          },
        })
        if (!(res.statusText === 'OK')) {
          console.log('Unable to delete role.')
        } else {
          const data = await res.data
          console.log(data.message)
        }
      } catch (error) {
        console.log(error)
      }
    }, async editRole(role) {
      console.log(role)
      try {
        const res = await axiosInstance.patch('role/edit/' + this.currentRole.id, role, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
          },
        },)
        if (!(res.statusText === 'OK')) {
          console.log('Unable to edit role.')
        } else {
          const data = await res.data
          console.log(data)
          await this.getRoles()
        }
      } catch (error) {
        console.log(error)
      }
    }, async getRolePermissions() {
      try {
        const res = await axiosInstance.get('role/permission/' + this.currentRole.id, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
          },
        })
        if (!(res.statusText === 'OK')) {
          console.log('Unable to get permissions.')
        } else {
          const data = await res
          this.permissionOfCurrentRoles = data.data.permissions.map(role => role.id)
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
})
