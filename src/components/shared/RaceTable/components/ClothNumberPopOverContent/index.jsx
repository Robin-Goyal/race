/* eslint-disable react/prop-types */
import React, { memo } from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useClothNumberPopOverContentStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 250,
    padding: 15,
    paddingBottom: 7,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  image: {
    display: 'block',
    paddingTop: 5
  },
  caption: {
    color: theme.palette.common.white,
    fontFamily: '"lato", sans-serif',
    letterSpacing: 1.21,
    fontWeight: 'normal',
    fontSize: 13,
    marginLeft: 10
  }
}))

const ClothNumberPopOverContent = ({ caption, imageUrl = null }) => {
  const classes = useClothNumberPopOverContentStyles()
  return (
    <div className={classes.root}>
      {imageUrl && (
        <img
          src={`${process.env.API_URL}${imageUrl}`}
          className={classes.image}
        />
      )}
      <Typography variant="caption" classes={{ caption: classes.caption }}>
        {caption}
      </Typography>
    </div>
  )
}

export default memo(ClothNumberPopOverContent)
