import {defineStore} from "pinia";
import axiosInstance from "src/utils/axiosInstance.js";

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    permissions: [],
    currentPermission: null,
  }),
  getters: {},
  actions: {
    async createPermission(permission) {
      console.log(permission)
      try {
        const res = axiosInstance.post('/permission/create', permission, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
          }
        })
        if (!((await res).statusText === 'OK')) {
          console.log('Unable to create permission.');
        } else {
          // const data = await  res.data
          await this.getPermissions()
        }

      } catch (error) {
        console.log(error)
      }
    },
    async getPermissions() {
      try {
        const res = await axiosInstance.get('/permission/index', {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
          },
        })
        if (!( res.statusText === 'OK')) {
          console.log('Unable to get permissions')
        } else {
          this.permissions = await res.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    async deletePermission(permissionId) {
      try {
        const res = await axiosInstance.delete('/permission/delete/' + permissionId, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
          },
        })
        if (!(res.statusText === 'OK')) {
          console.log('Unable to delete permission.')
        } else {
          const data = await res.data
          console.log(data.message)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async editPermission() {
      console.log(this.currentPermission.name)
      try {
        const res = await axiosInstance.patch(
          'permission/edit/' + this.currentPermission.id,
          this.currentPermission,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('userToken'),
            },
          },
        )
        if (!(res.statusText === 'OK')) {
          console.log('Unable to edit permission.')
        } else {
          const data = await res.data
          console.log(data)
          await this.getPermissions()
        }
      } catch (error) {
        console.log(error)
      }

    }
  }

})
