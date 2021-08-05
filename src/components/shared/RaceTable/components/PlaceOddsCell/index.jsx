/* eslint-disable react/prop-types */
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

const useCellStyles = makeStyles(() => ({
  root: {
    fontWeight: 700,
    fontSize: '14px',
    padding: '0 2px'
  }
}))
const PlaceOddsCell = ({ value, res }) => {
  const classes = useCellStyles()
  if (!value || !value.value) return <div>-</div>

  let isSmallest = true
  if (!value.sp && res && res.rows && res.rows.length > 0) {
    for (let i = 0; i < res.rows.length; i++) {
      if (
        res.rows[i].original.place_price.value &&
        res.rows[i].original.place_price.value < value.value
      ) {
        isSmallest = false
      }
    }
  }
  const color = isSmallest ? '#000000' : '#57575f'

  return (
    <div className={classes.root} style={{ color: color }}>
      {!value.sp ? `(${value.value.toFixed(2)})` : value.value.toFixed(2)}
    </div>
  )
}
PlaceOddsCell.propTypes = {
  value: PropTypes.any,
  res: PropTypes.object
}
export default memo(PlaceOddsCell)
