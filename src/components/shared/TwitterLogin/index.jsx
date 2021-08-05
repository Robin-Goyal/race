import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { openWindow, observeWindow } from './services/window'

const TwitterLogin = ({ title, className, authURL, authCallback }) => {
  const handleLoginClick = async () => {
    const popup = openWindow({
      url: authURL,
      name: 'Authorisation via Twitter'
    })
    observeWindow({ popup, onClose: handleClosingPopup })
  }

  const handleClosingPopup = () => {
    authCallback && authCallback()
  }

  return (
    <Button
      className={className}
      onClick={handleLoginClick}
      color="primary"
      variant="contained"
      style={{
        textTransform: 'inherit'
      }}
    >
      {title || 'Authorisation via Twitter'}
    </Button>
  )
}

TwitterLogin.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  authURL: PropTypes.string.isRequired,
  authCallback: PropTypes.func
}

export default TwitterLogin
