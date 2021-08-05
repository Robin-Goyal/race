import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Select from '@components/shared/Form/Select'
import isEqual from 'lodash/isEqual'
import { Tooltip, Button, makeStyles } from '@material-ui/core'
import { Clear, Add } from '@material-ui/icons'
import useMemberStore from '@utils/customHook/useMembersStore'

const useStyles = makeStyles(() => ({
  button: {
    minWidth: 36,
    width: 36,
    height: 38,
    padding: 0,
    fontSize: 13,
    fontFamily: '"lato",sans-serif',
    border: '1px solid #cccccc',
    borderRadius: 4,
    color: '#4d4f5c',
    background: '#fff',
    fontWeight: 900,
    textTransform: 'none'
  },
  icon: {
    width: 18,
    height: 18
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

const StatsTopFilter = ({
  filterValue = {},
  filterOptions = {},
  filterChangeHandler,
  handleDeleteStatsModal,
  handleAddStatsModal,
  label = '',
  showAddDelete = false,
  isLoading,
  buttonDisabled,
  ...props
}) => {
  const classes = useStyles()
  const { memberStorage } = useMemberStore()

  return (
    <div
      className="stats-top-bar__list-item stats-top-bar__list-item--select"
      style={!showAddDelete ? { maxWidth: 142 } : null}
    >
      {label && !isLoading && (
        <label className="stats-top-bar__label" htmlFor="statsTypeSelect">
          <Typography style={{ letterSpacing: '0.39px' }}>{label}</Typography>
        </label>
      )}
      <div className={classes.row}>
        <Select
          value={[filterValue]}
          onChange={filterChangeHandler}
          options={filterOptions}
          {...props}
        />
        {showAddDelete && (
          <>
            <Tooltip title="Delete the current data filter set">
              <span>
                <Button
                  type="button"
                  color="primary"
                  size="small"
                  disabled={
                    buttonDisabled || !filterValue || filterValue === 'Default'
                  }
                  className={classes.button}
                  onClick={handleDeleteStatsModal}
                >
                  <Clear className={classes.icon} />
                </Button>
              </span>
            </Tooltip>
            <Tooltip
              title={`Add a new data filter set from the current data filters. You can have a maximum of ${
                memberStorage.settings
                  ? memberStorage.settings.max_stats_filters
                  : 0
              }`}
            >
              <span>
                <Button
                  type="button"
                  color="primary"
                  size="small"
                  disabled={
                    buttonDisabled ||
                    memberStorage.settings.max_stats_filters < 1 ||
                    memberStorage.settings.max_stats_filters + 1 <=
                      filterOptions.length
                  }
                  className={classes.button}
                  onClick={handleAddStatsModal}
                >
                  <Add className={classes.icon} />
                </Button>
              </span>
            </Tooltip>
          </>
        )}
      </div>
    </div>
  )
}
StatsTopFilter.propTypes = {
  isLoading: PropTypes.bool,
  filterValue: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  label: PropTypes.string,
  showAddDelete: PropTypes.bool,
  filterOptions: PropTypes.array,
  filterChangeHandler: PropTypes.func,
  handleDeleteStatsModal: PropTypes.func,
  handleAddStatsModal: PropTypes.func,
  buttonDisabled: PropTypes.bool
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
    isEqual(prevProps.filterValue, nextProps.filterValue) &&
    isEqual(prevProps.isDisabled, nextProps.isDisabled) &&
    isEqual(prevProps.buttonDisabled, nextProps.buttonDisabled)
  )
}

export default memo(StatsTopFilter, areEqual)
