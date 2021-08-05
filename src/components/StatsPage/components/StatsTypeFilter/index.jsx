import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Typography, ButtonGroup, Button } from '@material-ui/core'
import isEqual from 'lodash/isEqual'
import { withStyles } from '@material-ui/core/styles'

const CustomButton = withStyles((theme) => ({
  root: {
    boxShadow: 'none',
    textTransform: 'capitalize',
    fontSize: 13,
    padding: '7px 15px',
    lineHeight: '23px',
    backgroundColor: '#f3f3f3',
    color: '#808080',
    borderColor: '#cccccc',
    '&:focus': {
      boxShadow: 'none',
      backgroundColor: '#f3f3f3',
      color: '#808080',
      borderColor: '#cccccc'
    },
    '&:active': {
      boxShadow: 'none',
      borderColor: '#cccccc',
      backgroundColor: '#ffffff',
      color: theme.palette.primary.light
    },
    '&:hover': {
      backgroundColor: '#ffffff',
      borderColor: '#cccccc',
      boxShadow: 'none',
      color: theme.palette.primary.light
    },
    '&.active-btn': {
      boxShadow: 'none',
      borderColor: '#cccccc',
      backgroundColor: '#ffffff',
      color: theme.palette.primary.light
    }
  }
}))(Button)

const StatsTypeFilter = ({
  filterValue = {},
  filterOptions = {},
  filterChangeHandler,
  label = ''
}) => (
  <div className="stats-top-bar__list-item stats-top-bar__list-item--button-group">
    {label && (
      <label className="stats-top-bar__label" htmlFor="statsTypeSelect">
        <Typography style={{ letterSpacing: '0.39px' }}>{label}</Typography>
      </label>
    )}
    <ButtonGroup
      className="button-tab"
      aria-label="outlined primary button group"
      disableFocusRipple
      fullWidth
    >
      {filterOptions.map((option) => (
        <CustomButton
          key={option.value}
          onClick={filterChangeHandler(option)}
          className={
            filterValue && filterValue.value === option.value
              ? 'active-btn'
              : ''
          }
        >
          {option.label}
        </CustomButton>
      ))}
    </ButtonGroup>
  </div>
)

StatsTypeFilter.propTypes = {
  filterValue: PropTypes.object,
  label: PropTypes.string,
  filterOptions: PropTypes.array,
  filterChangeHandler: PropTypes.func
}

function areEqual(prevProps, nextProps) {
  if (
    prevProps.filterValue === undefined &&
    nextProps.filterValue === undefined
  ) {
    return true
  }
  if (
    prevProps.filterOptions === undefined &&
    nextProps.filterOptions === undefined
  ) {
    return false
  }
  return (
    isEqual(prevProps.filterOptions, nextProps.filterOptions) &&
    isEqual(prevProps.filterValue, nextProps.filterValue)
  )
}

export default memo(StatsTypeFilter, areEqual)
