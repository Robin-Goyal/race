import React, { memo } from 'react'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useDateCellStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    padding: '0 5px',
    whiteSpace: 'nowrap'
  }
}))

const TextCell = ({ value, showBorder = false }) => {
  const classes = useDateCellStyles()
  if (!value) return <div>-</div>

  return (
    <div
      className={classes.root}
      style={showBorder ? { borderRight: '1px solid #ddd' } : null}
    >
      {value}
    </div>
  )
}

TextCell.propTypes = {
  value: PropTypes.string.isRequired,
  showBorder: PropTypes.bool
}
export default memo(TextCell)
