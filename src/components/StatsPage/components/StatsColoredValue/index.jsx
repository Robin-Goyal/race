import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import PropTypes from 'prop-types'

const useColoredValueStyles = makeStyles(theme => ({
  positiveValue: {
    color: theme.palette.positiveValue
  },
  negativeValue: {
    color: theme.palette.negativeValue
  }
}))

const StatsColoredValue = ({ value, cutoff = 0, isPercentage = false }) => {
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
      {/* eslint-disable-next-line react/prop-types */}
      {value.toFixed(2)}
      {isPercentage ? '%' : ''}
    </span>
  )
}

StatsColoredValue.propTypes = {
  value: PropTypes.number,
  cutoff: PropTypes.number,
  isPercentage: PropTypes.bool
}
export default StatsColoredValue
