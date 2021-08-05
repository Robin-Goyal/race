import axios from 'axios'
import { apiBaseUrl } from '@constants/api'
import helpers from '@utils/helpers'

let instance = null

export class ApiInstance {
  constructor(baseURL, headers) {
    if (!instance) {
      instance = ApiInstance.create(baseURL, headers)
      this.setInterceptors()
    }
    return instance
  }

  static create(baseURL, headers) {
    axios.defaults.withCredentials = true
    axios.defaults.xsrfHeaderName = 'X-CSRFToken'
    axios.defaults.xsrfCookieName = 'csrftoken'
    return axios.create({
      baseURL,
      headers
    })
  }

  setInterceptors() {
    instance.interceptors.response.use(
      (res) => res.data,
      (err) => {
        if (err.response) {
          switch (err.response.status) {
            case 500:
              return Promise.reject('Network Service Error.Try again later')
            // window.location.href = routes.auth.login(window.location.origin + '/')
            case 401:
              // window.location.href = routes.auth.login(window.location.origin + '/')
              break
            case 404:
              // window.location.href = routes.pageNotFound
              break
            default:
              return Promise.reject(helpers.handleServerErrors(err))
          }
          return
        }
        return // history.push(routes.serverUnavailable)
      }
    )
  }
}

const headers = {
  'Accept-Language': 'en',
  'Content-Type': 'application/json'
}

const Api = new ApiInstance(apiBaseUrl, headers)

export default Api
