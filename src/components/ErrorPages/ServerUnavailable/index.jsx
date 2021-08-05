import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import SEO from '@components/SEO'

const ServerUnavailable = () => (
  <Grid container direction="column" alignItems="center" justify="center">
    <SEO title="Service Unavailable" />
    <Box mx="auto" p={1} m={4}>
      <Typography
        gutterBottom={true}
        align="center"
        variant="h4"
        component="h4"
        display="block"
      >
        Server is not available at the moment. We’ll be back soon!
      </Typography>
      <Typography
        gutterBottom={true}
        align="center"
        variant="subtitle1"
        display="block"
      >
        Sorry for the inconvenience but we’re performing some maintenance at the
        moment. If you need to you can always contact us at{' '}
        <a href="mailto:support@ratingtheraces.com">
          support@ratingtheraces.com
        </a>
        , otherwise we’ll be back online shortly!
      </Typography>
    </Box>
  </Grid>
)

export default ServerUnavailable
