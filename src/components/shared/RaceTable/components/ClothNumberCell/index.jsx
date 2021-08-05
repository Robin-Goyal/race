/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { memo } from 'react'
import PopOver from '@components/shared/PopOver'
import ClothNumberPopOverContent from '../ClothNumberPopOverContent'
import { makeStyles } from '@material-ui/core/styles'

const useClothNumberCellStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'relative',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    display: 'flex',
    lineHeight: 1.5
  },
  popover: {
    width: '100%',
    position: 'relative'
  },
  number: {
    width: 16,
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: 700,
    display: 'inline-block',
    position: 'absolute',
    left: '30px',
    bottom: '-3px',
    textShadow:
      '-0.108em 0.054em #fff, 0em 0.054em #fff, -0.054em 0.054em 0.054em #fff, 0.054em 0.054em 0.054em #fff'
  },
  image: {
    marginLeft: 10,
    marginRight: 10,
    width: 26,
    height: 21
  },
  content: {
    display: 'flex',
    alignItems: 'baseline',
    minWidth: 40,
    justifyContent: 'space-between',
    position: 'relative'
  }
}))

const ClothNumberCell = ({ value }) => {
  const classes = useClothNumberCellStyles()
  if (!value || !value.number) return <div>-</div>

  return (
    <div className={classes.root}>
      <PopOver
        content={
          <ClothNumberPopOverContent
            caption={value.description}
            imageUrl={value.image_url}
          />
        }
        className={classes.popover}
      >
        <div className={classes.content}>
          <img
            src={`${process.env.API_URL}${value.image_url}`}
            className={classes.image}
            alt="Dress"
          />
          <span className={classes.number}>{value.number}</span>
        </div>
      </PopOver>
    </div>
  )
}

const areEqual = (prevProps, nextProps) => true
export default memo(ClothNumberCell, areEqual)
