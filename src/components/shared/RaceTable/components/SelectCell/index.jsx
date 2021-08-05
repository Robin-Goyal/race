import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import makeStyles from '@material-ui/core/styles/makeStyles'
import PropTypes from 'prop-types'

const useSelectedCellStyles = makeStyles(() => ({
  root: {
    padding: 0,
    zIndex: 3,
    margin: 0
  },
  check: {
    padding: 0
  },
  icon: {
    color: 'white'
  }
}))

const SelectedCell = ({ run }) => {
  const classes = useSelectedCellStyles()
  return (
    <div className={classes.root}>
      <Checkbox
        className={classes.check}
        color="primary"
        checked={run.isSelected}
      />
    </div>
  )
}
SelectedCell.propTypes = {
  run: PropTypes.shape({
    isSelected: PropTypes.bool
  })
}

export default SelectedCell
