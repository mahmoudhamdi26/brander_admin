import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Create an axios instance
const api = axios.create({ baseURL: 'http://localhost:8080/api/v1' })

// Add a request interceptor
api.interceptors.request.use(function (config) {
  // Get the token from localStorage
  const token = localStorage.getItem('token')
  // Get the flag from the config
  const useAuth = config.useAuth || false
  // If the token exists and the flag is true, set the Authorization header
  if (token && useAuth) {
    console.log('Adding AUTH Header');
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
