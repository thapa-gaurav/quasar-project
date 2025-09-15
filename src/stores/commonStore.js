import { defineStore } from 'pinia'
import axiosInstance from 'src/utils/axiosInstance.js'

export const useCommonStore = defineStore('common', {
  state: () => ({}),
  getters: {},
  actions: {
    async createItem(endPoint, data) {
      try {
        return axiosInstance.post(endPoint, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
          },
        })
      } catch (error) {
        console.log(error)
      }
    },
    async readItem(endPoint) {
      try {
        return await axiosInstance.get(endPoint, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
          },
        })
      } catch (error) {
        console.error(error)
      }
    },
    async deleteItem(endPoint) {
      try {
        return await axiosInstance.delete(endPoint, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
          },
        })
      } catch (error) {
        console.log(error)
      }
    },
    async editItem(endPoint, data) {
      try {
        return await axiosInstance.patch(endPoint, data, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
          },
        })
      } catch (error) {
        console.error(error)
      }
    },
  },
})
