/* eslint-disable react/prop-types */
import React, { memo } from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useCommonPopOverContentStyles = makeStyles((theme) => ({
  root: {
    padding: 15,
    whiteSpace: 'nowrap',
    paddingBottom: 7
  },
  caption: {
    color: theme.palette.common.white,
    fontFamily: '"lato", sans-serif',
    letterSpacing: 1.21,
    fontWeight: 'normal',
    fontSize: 13
  },
  subtitle: {
    color: theme.palette.common.white,
    fontFamily: '"lato", sans-serif',
    letterSpacing: 1.21,
    fontWeight: 'normal',
    fontSize: 11
  }
}))

const CommonPopOverContent = ({ caption, description }) => {
  const classes = useCommonPopOverContentStyles()
  return (
    <div className={classes.root}>
      <Typography variant="caption" classes={{ caption: classes.caption }}>
        {caption}
      </Typography>
      {description && (
        <div>
          <Typography variant="caption" classes={{ caption: classes.subtitle }}>
            {description}
          </Typography>
        </div>
      )}
    </div>
  )
}

export default memo(CommonPopOverContent)
