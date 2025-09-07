import axios from 'axios'

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
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized - redirecting to login...')
      localStorage.removeItem('userToken')
      window.location.href = 'http://localhost:9002/#/login'
      window.location.reload()
      alert('Unauthenticated access.')
    }
    return Promise.reject(error)
  }
)
export default axiosInstance;
