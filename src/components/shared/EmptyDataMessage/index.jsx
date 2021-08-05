import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import WithLoading from '@components/shared/WithLoading'
import Container from '@material-ui/core/Container'

const EmptyDataMessage = ({ message = 'No data' }) => (
  <Container className="row">
    <div className="col-xs-12 ">
      <div className="row center-md">
        <Typography color="inherit">{message}</Typography>
      </div>
    </div>
  </Container>
)

EmptyDataMessage.propTypes = {
  message: PropTypes.string
}

export default WithLoading(EmptyDataMessage)
