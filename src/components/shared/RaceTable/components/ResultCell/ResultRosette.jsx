import React, { memo } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/core/styles/makeStyles'
import helpers from '@utils/helpers'

const useResultRosetteStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    borderRadius: 20,
    width: 40,
    height: 14,
    fontSize: 13,
    fontFamily: '"lato", sans-serif',
    fontWeight: 700,
    padding: 5
  },
  gold: {
    backgroundColor: theme.palette.gold
  },
  silver: {
    backgroundColor: theme.palette.silver
  },
  bronze: {
    backgroundColor: theme.palette.bronze
  },
  copper: {
    backgroundColor: theme.palette.copper
  },
  tin: {
    backgroundColor: theme.palette.tin
  }
}))

const ResultRosette = ({ value }) => {
  const classes = useResultRosetteStyles()

  let color

  switch (value) {
    case 1:
      color = 'gold'
      break
    case 2:
      color = 'silver'
      break
    case 3:
      color = 'bronze'
      break
    case 4:
      color = 'copper'
      break
    case 5:
      color = 'tin'
      break
  }

  return (
    <div className={classNames(classes.root, classes[color])}>
      {helpers.addOrdinalSuffix(value)}
    </div>
  )
}

ResultRosette.propTypes = {
  value: PropTypes.number.isRequired
}

export default memo(ResultRosette)
