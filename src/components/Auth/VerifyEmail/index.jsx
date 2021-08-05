import React, { useEffect, useState } from 'react'
import * as qs from 'query-string'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import api from '@utils/api'
import { apiUrls } from '@constants/api'
import Loader from '@components/shared/Loader'
import Button from '@components/shared/Button'
import routes from '@constants/routes'

const statuses = {
  loading: 'loading',
  success: 'success',
  error: 'error'
}

const VerifyEmail = ({ history }) => {
  const [status, setStatus] = useState(statuses.loading)

  const { key } = qs.parse(history.location.search)

  useEffect(() => {
    ;(async () => {
      try {
        await api.post(apiUrls.auth.verifyEmail, { key })
        setStatus(statuses.success)
      } catch (e) {
        setStatus(statuses.error)
      }
    })()
  }, [])

  return (
    <section className="row">
      <div className="col-xs-12">
        {status === statuses.loading && <Loader />}
        {status === statuses.success && (
          <>
            <h3>Email was confirmed</h3>
            <Button type="button" to={routes.auth.login}>
              Login
            </Button>
          </>
        )}
        {status === statuses.error && <h3>Something went wrong</h3>}
      </div>
    </section>
  )
}

VerifyEmail.propTypes = {
  history: PropTypes.any
}

export default withRouter(VerifyEmail)
