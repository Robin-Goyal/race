import Cookies from './cookies'

class Storage {
  static isLocalStorageSupported() {
    const storage = window.localStorage
    const testKey = 'testLocalStorageFunctionality'
    let supported = true

    try {
      storage.setItem(testKey, testKey)
      storage.removeItem(testKey)
    } catch (error) {
      supported = false
    }

    return !!supported
  }

  static get(key) {
    let value
    if (Storage.isLocalStorageSupported()) {
      value = window.localStorage.getItem(key)
    } else {
      value = Cookies.get(key)
    }

    try {
      if (value) {
        value = JSON.parse(value)
      }
      return value
    } catch (error) {
      return value
    }
  }

  static set(key, data) {
    const value = JSON.stringify(data)

    if (Storage.isLocalStorageSupported()) {
      window.localStorage.setItem(key, value)
    } else {
      Cookies.set(key, value)
    }
  }

  static remove(key) {
    if (Storage.isLocalStorageSupported()) {
      window.localStorage.removeItem(key)
    } else {
      Cookies.remove(key)
    }
  }
}

export default Storage
