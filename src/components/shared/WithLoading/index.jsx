import React from 'react'
import Loader from '../Loader'

const WithLoading = Component => ({ isLoading, ...props }) =>
  isLoading ? <Loader loadingMessage={props.loadingMessage} /> : <Component {...props} />
export default WithLoading
