import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import * as Yup from 'yup'
import { ToastContainer } from 'react-toastify'
import ReactGA from 'react-ga'
import { Provider } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import 'normalize.css'
import yupLocale from './constants/yupLocale'
import AppRouter from './router'
import '@assets/styles/main.scss'
import AuthSession from '@utils/session'
import SEO from '@components/SEO'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { store, history } from './store'
import { theme } from '@constants/material/theme'

ReactGA.initialize('UA-26682230-1')
Yup.setLocale(yupLocale)
AuthSession.setHeader()

history.listen((location) => {
  ReactGA.set({ page: location.pathname + location.search })
  ReactGA.pageview(location.pathname + location.search)
})

const App = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [])
  return (
    <Provider store={store}>
      <SEO title="Dashboard" />
      <MuiThemeProvider theme={theme}>
        <AppRouter />
        <ToastContainer hideProgressBar={true} closeButton={false} />
      </MuiThemeProvider>
    </Provider>
  )
}

const rootElement = document.getElementById('root')
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(<App />, rootElement)
} else {
  ReactDOM.render(<App />, rootElement)
}
