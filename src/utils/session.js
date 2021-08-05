import { SESSION_KEY } from '../constants/common'
import Storage from './storage'
import Api from '@utils/api'
import routes from '@constants/routes'

class AuthSession {
  static sessionKey = SESSION_KEY

  static isTokenSet() {
    const authToken = Storage.get(this.sessionKey)
    return authToken && !!authToken.trim()
  }

  static setHeader() {
    if (AuthSession.isTokenSet()) {
      Api.defaults.headers.Authorization = `Token ${Storage.get(
        AuthSession.sessionKey
      )}`
    }
  }

  static removeHeader() {
    delete Api.defaults.headers.Authorization
  }

  static set(tokenValue) {
    Storage.set(AuthSession.sessionKey, tokenValue)
    AuthSession.setHeader()
  }

  static remove() {
    Storage.remove(AuthSession.sessionKey)
    AuthSession.removeHeader()
  }

  static login(token) {
    AuthSession.set(token)
    window.location = routes.dashboard
  }

  static logout(hashKey) {
    AuthSession.remove()
    if (hashKey) {
      window.location = `https://ratingtheraces.com/webratings.php?logout=${hashKey}&redirect_to=${
        window.location.origin + '/'
      }`
    } else {
      window.location = routes.home
    }
  }
}

export default AuthSession
