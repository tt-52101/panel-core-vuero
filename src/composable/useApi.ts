import axios, { AxiosInstance } from 'axios'
import { useNotyf } from '/@src/composable/useNotyf'

import { useUserSession } from '/@src/stores/userSession'

const notyf = useNotyf()

let api: AxiosInstance

export function createApi() {
  // Here we set the base URL for all requests made to the api
  api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  })

  // We set an interceptor for each request to
  // include Bearer token to the request if user is logged in
  api.interceptors.request.use(
    (config) => {
      const userSession = useUserSession()

      if (userSession.isLoggedIn) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${userSession.token}`,
        }
      }

      return config
    },

    (err) => {
      if (err.message == 'Network Error')
        notyf.error({
          message: 'Connection error! Please try again later',
          duration: 5000,
        })
      return Promise.reject(err)
    }
  )

  return api
}

export function useApi() {
  if (!api) {
    createApi()
  }
  return api
}
