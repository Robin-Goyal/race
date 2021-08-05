import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import { withTheme } from '@material-ui/core/styles'

const Loader = ({ loadingMessage }) => (
  <div
    style={{
      position: 'relative',
      width: '100%',
      height: '100vh'
    }}
  >
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{
        position: 'absolute',
        top: '30%',
        transform: 'translateY(-50%)',
        textAlign: 'center'
      }}
    >
      <Grid item xs={3}>
        <CircularProgress disableShrink color="primary" />
        {loadingMessage && <>{loadingMessage}</>}
      </Grid>
    </Grid>
  </div>
)

Loader.propTypes = {
  loadingMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
}

export default withTheme(Loader)
