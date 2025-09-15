import axios from 'axios'
import {Notify} from "quasar";
// import { Notify} from "quasar";

import.meta.env.BASE_URL

const axiosInstance = axios.create({
  // baseURL : 'http://localhost:8000/api',
  baseURL: process.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = 'http://localhost:9002/#/login'
      localStorage.removeItem('userToken')
      Notify.create({
        type:'negative',
        message:'Unauthorized - redirected to login...'
      })}
    return Promise.reject(error)
  })
export default axiosInstance
