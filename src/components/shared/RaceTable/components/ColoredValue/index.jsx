/* eslint-disable react/prop-types */
import React, { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useColoredValueStyles = makeStyles((theme) => ({
  positiveValue: {
    color: theme.palette.positiveValue
  },
  negativeValue: {
    color: theme.palette.negativeValue
  }
}))
const ColoredValue = ({ value, cutoff = 0, isPercentage = false }) => {
  const classes = useColoredValueStyles()
  if (value == null) return '-'

  let className = ''
  if (value > cutoff) {
    className = classes.positiveValue
  } else if (value < cutoff) {
    className = classes.negativeValue
  }

  return (
    <span className={className}>
      {typeof value === 'string' ? value : value.toFixed(2)}
      {isPercentage ? '%' : ''}
    </span>
  )
}

export default memo(ColoredValue)
