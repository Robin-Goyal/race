const isNotProductionEnvironment = process.env.NODE_ENV !== 'production'

/* eslint-disable no-console */
const Logger = {
  log(...args) {
    isNotProductionEnvironment && console.log(...args)
  },
  info(...args) {
    isNotProductionEnvironment && console.info(...args)
  },
  warn(...args) {
    isNotProductionEnvironment && console.warn(...args)
  },
  error(...args) {
    isNotProductionEnvironment && console.error(...args)
  }
}
/* eslint-enable no-console */

export default Logger
