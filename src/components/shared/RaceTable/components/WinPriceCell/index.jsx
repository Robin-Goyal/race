/* eslint-disable react/prop-types */
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

const useWinPriceCellStyles = makeStyles(() => ({
  root: {
    fontWeight: 700,
    fontSize: '14px',
    padding: '0 2px'
  }
}))
const WinPriceCell = ({ value, res, isPercentage = false }) => {
  const classes = useWinPriceCellStyles()
  if (!value) return <div>-</div>

  let isSmallest = true
  if (
    !isPercentage &&
    res &&
    res.rows &&
    res.rows.length > 0 &&
    !res.row.original.win_price.sp
  ) {
    for (let i = 0; i < res.rows.length; i++) {
      if (
        res.rows[i].original.win_price.value &&
        res.rows[i].original.win_price.value < value
      ) {
        isSmallest = false
      }
    }
  }
  const color = isPercentage ? '#000000' : isSmallest ? '#000000' : '#57575f'

  return (
    <div className={classes.root} style={{ color: color }}>
      {isPercentage
        ? `${value.toFixed(2)}%`
        : !res.row.original.win_price.sp
        ? `(${value.toFixed(2)})`
        : value.toFixed(2)}
    </div>
  )
}
WinPriceCell.propTypes = {
  value: PropTypes.any,
  isPercentage: PropTypes.bool
}
export default memo(WinPriceCell)
